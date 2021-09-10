<template>
  <div>

  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';//快速生成更为复杂的通用唯一标识符
import faker from "faker"; //用于在浏览器及 Node.js 中生成大量假数据。
export default {
  data () {
    return {

    }
  },
  created () {
    // uuidv4()
    // this.generateCustomers()
  },
  methods: {
    generateCustomers () {
      return Array.from({ length: 5 }, () => ({
        id: faker.name.firstName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.firstName(),
        phoneNumber: faker.phone.phoneNumberFormat(),
        zipCode: faker.address.zipCode(),
        date: faker.date.recent()
      }))
    }
  }
}
</script>

<style>
</style>