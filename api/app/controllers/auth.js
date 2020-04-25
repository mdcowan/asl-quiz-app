const axios = require('axios');
const error = require('debug')('api:error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users } = require('../models');

exports.exchangeCode = async (req, res) => {
  // pull the code out of the body
  const { code, url } = req.body;
  try {
    // make a request to slack for the access_token
    const { data } = await axios.get(
      'https://slack.com/api/oauth.access',
      {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          redirect_uri: url,
          code,
        },
      },
    );
    const [user] = await Users.upsert({
      username: data.user.email,
      access_token: data.access_token,
      name: data.user.name,
      type: 'slack',
    }, { returning: true });
    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.json({ token, loggedIn: true });
  } catch (e) {
    // log the error
    error(e);
    // send an unauthorized response if something above fails to work.
    res.status(401).json({ loggedIn: false });
  }
};

exports.getUser = async (req, res) => {
  // pull the username and password out of the body
  const { username, password } = req.body;
  console.log(`INFO: Finding user${username} ${password}`);
  const [user] = await Users.findAll({
    where: {
      username: username.toLowerCase(),
      type: 'regular',
    },
  });

  if (user) {
    console.log('INFO: User found. Verifying password');
    const loggedIn = false;
    await bcrypt.compare(password, user.password).then((result) => {
      const token = jwt.sign({ id: user.id }, process.env.SECRET);
      res.json({ token, loggedIn: result });
    });

    if (!loggedIn) {
      // log the error
      error('WARNING: Password Incorrect');
      // send an unauthorized response.
      res.status(401).json({ loggedIn: false });
    }
  } else {
    // log the error
    error('WARNING: No logins found');
    // send an unauthorized response if something above fails to work.
    res.status(204).json({ loggedIn: false });
  }
};


// add a new user
exports.createUser = async (req, res) => {
  // get the data values from the request body
  const { username, password } = req.body;
  // format the username
  const un = username.toLowerCase();
  // check for duplicate users
  console.log('INFO: Checking for duplicate user');
  const [user] = await Users.findAll({
    where: {
      username: un,
      type: 'regular',
    },
  });
  if (user) {
    // log the error
    error('WARNING: User cannot be duplicate');
    // send an unauthorized response.
    res.sendStatus(400);
  } else {
    // encrypt the password
    const saltRounds = 10;
    console.log('INFO: Encrypting password.');
    await bcrypt.hash(password, saltRounds, async (e, hash) => {
      if (!e) {
        try {
          // create the user and save the new id
          const newUser = await Users.create({ username: un, password: hash, type: 'regular' });
          // send the new id back to the request
          console.log(`INFO: UserId ${newUser.id} saved.`);
          res.sendStatus(200);
        } catch (er) {
          // map the error messages and send them back
          const errors = er.errors.map((err) => err.message);
          res.status(400).json({ errors });
        }
      } else {
        // log the error
        error('WARNING: Encryption Failed');
        res.sendStatus(500);
      }
    });
  }
};
