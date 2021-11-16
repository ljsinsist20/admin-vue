<template>
  <div>
    <div class="Echarts">
      <div id="main1" style="width: 600px;height:400px;"></div>
      <hr />
      <div id="main2" style="width: 600px;height:400px;"></div>
    </div>
  </div>
</template>

<script>
// import echarts from 'echarts'
import * as echarts from 'echarts'
import indexAPI from '@/api/core/index.js'
export default {
  name: 'Echarts',
  data() {
    return {
      boyNum: 0,
      girlNum: 0
    }
  },
  created() {},
  methods: {
    findSex() {
      indexAPI.findSex().then(response => {
        this.boyNum = response.data.sexVO.boyNum
        this.girlNum = response.data.sexVO.girlNum
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('main1'))
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '学生男女比例'
          },
          series: [
            {
              type: 'pie',
              data: [
                {
                  value: this.boyNum,
                  name: '男生',
                  label: {
                    normal: {
                      show: true,
                      formatter: '{b}: {c}({d}%)'
                    }
                  }
                },
                {
                  value: this.girlNum,
                  name: '女生',
                  label: {
                    normal: {
                      show: true,
                      formatter: '{b}: {c}({d}%)'
                    }
                  }
                }
              ]
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option, true)
      })
    }
    //   findDepartment() {
    //     indexAPI.findDepartment().then(response => {
    //       // 基于准备好的dom，初始化echarts实例
    //       var myChart2 = echarts.init(document.getElementById('main2'))
    //       // 指定图表的配置项和数据
    //       var option = {
    //         title: {
    //           text: '学生男女比例'
    //         },
    //         series: [
    //           {
    //             type: 'pie',
    //             data: [
    //               {
    //                 value: this.boyNum,
    //                 // name: ,
    //                 label: {
    //                   normal: {
    //                     show: true,
    //                     formatter: '{b}: {c}({d}%)'
    //                   }
    //                 }
    //               },
    //               {
    //                 value: this.girlNum,
    //                 // name: ,
    //                 label: {
    //                   normal: {
    //                     show: true,
    //                     formatter: '{b}: {c}({d}%)'
    //                   }
    //                 }
    //               }
    //             ]
    //           }
    //         ]
    //       }
    //       // 使用刚指定的配置项和数据显示图表。
    //       myChart2.setOption(option, true)
    //     })
    //   }
  },
  mounted() {
    this.findSex()
    // this.findDepartment()
  }
}
</script>

<style>
</style>