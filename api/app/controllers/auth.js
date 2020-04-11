const axios = require('axios');
const error = require('debug')('api:error');
const jwt = require('jsonwebtoken');
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
