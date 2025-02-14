const cron = require('node-cron');
import axios from 'axios';
import { insertWarehouse } from './dbConnection';
async function getDataFromWb() {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const data = await axios({
    url: `https://common-api.wildberries.ru/api/v1/tariffs/box`,
    method: 'get',
    headers: {
      Authorization:
        'eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjQxMDE2djEiLCJ0eXAiOiJKV1QifQ.eyJlbnQiOjEsImV4cCI6MTc0NjA2ODAxNywiaWQiOiIwMTkyZGRlYS1mOWU2LTcxNzItODk0Ny1iMjE1Y2I5MmU5NDgiLCJpaWQiOjQ1OTExNjA5LCJvaWQiOjExMzA0NiwicyI6MTA3Mzc0MTgzMiwic2lkIjoiOTMyYzE3NmEtNTA4NS01YzZmLWJjMzMtNGU4NGNkZjU4ZDdlIiwidCI6ZmFsc2UsInVpZCI6NDU5MTE2MDl9.l2C-kGr-1YptJ5iyp_q1RYSxDOgENHXfGepnmo709g2UsGDnT90NnBt5K-nVLVH14XaEFi81dcmeZvF6qz-oxQ',
    },
    params: {
      date: date,
    },
  });
  const warehouseList = data.data.response.data.warehouseList;
  return warehouseList;
}

export async function startCron() {
  cron.schedule('0 */1 * * *', async () => {
    const warehouseList = await getDataFromWb();
    await insertWarehouse(warehouseList);
  });
}
