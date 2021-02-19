<template>
  <div>
    <div style="width: 90%; margin: 50px auto">
    感谢您使用与支持praise工具,如果您有任何建议或推荐的ppt模板，请电邮:
    <a href="mailto:yangjiahao@outlook.com"
      >yangjiahao@outlook.com</a
    >
    </div>
    <img src="/img/donate.jpg" style="display: block;
  margin-left: auto;
  margin-right: auto;
"></img>
  </div>
</template>
<script>
export default {
  methods: {
    copyMail: function () {
      navigator.clipboard.writeText('yangjiahao@outlook.com')
    },
  },
}
</script>