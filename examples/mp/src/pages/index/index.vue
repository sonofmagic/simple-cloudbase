<template>
  <view class="w-screen flex flex-col items-center">
    <button @click="getOpenId">getOpenId</button>
    <button @click="getOpenIdTs">getOpenIdTs</button>

    <view>quickstartFunctions</view>
    <button @click="invoke('getOpenId')">getOpenId</button>
    <button @click="invoke('createCollection')">createCollection</button>
    <button @click="invoke('selectRecord')">selectRecord</button>
    <button @click="invoke('sumRecord')">sumRecord</button>
    <button @click="invoke('updateRecord')">updateRecord</button>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getList,
  getOpenId,
  getOpenIdTs,
  getWxacodeUnlimit,
  quickstartFunctions
} from '@/cloud/index'
export default Vue.extend({
  data () {
    return {}
  },
  onLoad () {},
  methods: {
    getList,
    getOpenId,
    getOpenIdTs,
    getWxacodeUnlimit,
    invoke (type: string) {
      quickstartFunctions({
        type
      })
    }
  }
})
</script>
