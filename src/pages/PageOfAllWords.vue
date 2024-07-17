<template>
    <table>
      <thead>
        <tr>
          <th>kd</th>
          <th>kd</th>
          <th>kd</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>kd</td>
          <td>kd</td>
          <td>kd</td>
        </tr>
      </tbody>
    </table>
    <div>
      <p> {{ totalData.length }} </p>
    </div>
  </template>
  
  <script>

import { mapGetters } from 'vuex';


  export default {
    name: 'PageOfAllWords',
    computed: {
      ...mapGetters({
        totalData : 'totalWordData',
     }),
    },

  }
  </script>
  