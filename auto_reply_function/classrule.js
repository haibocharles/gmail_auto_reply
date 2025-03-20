// 設定分類模板
module.exports = [
    {
      name: 'visa',
      conditions: [
        { field: 'subject', match: /visa|簽證/gi }, // 匹配主題中包含 visa 或 簽證 的句子，不區分大小寫
        { field: 'body', match: /visa|簽證/gi }    // 匹配正文中包含 visa 或 簽證 的句子，不區分大小寫
      ],
    },
    {
      name: 'generalApplicationQuestions',
      conditions: [
        { field: 'subject', match: /application|申請|GRE|GMAT/gi }, // 匹配主題中包含 application 或 申請 的句子，不區分大小寫
        { field: 'body', match: /application|申請|GRE|GMAT/gi }    // 匹配正文中包含 application 或 申請 的句子，不區分大小寫
      ],
    }
  ];




