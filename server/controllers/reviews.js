const axios = require('axios');

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';

module.exports = {
  getReviewMetaData: (req, res) => {
    const url = '/reviews/meta?product_id=';
    const options = {
      method: 'get',
      baseURL,
      url: url + req.query.product_id,
      headers: {
        Authorization: process.env.API_KEY,
      },
    };
    axios(options)
      .then((result) => {
        res.status(200).json(result.data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  getReviewsByProduct: (req, res) => {
    const { product_id, sort } = req.query;
    let { page, count } = req.query;

    page = page || 1;
    count = count || 5;

    const url = `/reviews/?product_id=${product_id}&page=${page}&count=${count}&sort=${sort}`;

    const options = {
      method: 'get',
      baseURL,
      url,
      headers: {
        Authorization: process.env.API_KEY,
      },
    };

    axios(options)
      .then((results) => {
        res.status(200).json(results.data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  setHelpfulReview: (req, res) => {
    const { review_id } = req.body;

    const url = `/reviews/${review_id}/helpful`;
    const options = {
      method: 'put',
      baseURL,
      url,
      headers: {
        Authorization: process.env.API_KEY,
      },
      data: {
        helpfulness: req.body.helpfulness += 1,
      },
    };

    axios(options)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  addReview: (req, res) => {
    const url = '/reviews';
    const options = {
      method: 'post',
      baseURL,
      url,
      headers: {
        Authorization: process.env.API_KEY,
      },
      data: req.body,
    };

    axios(options)
      .then((result) => {
        res.status(201).send(result.data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  reportReview: (req, res) => {
    const { review_id } = req.body;
    const url = `/reviews/${review_id}/report`;

    const options = {
      method: 'put',
      baseURL,
      url,
      headers: {
        Authorization: process.env.API_KEY,
      },
    };

    axios(options)
      .then((results) => {
        res.status(204).json(results.data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
};
