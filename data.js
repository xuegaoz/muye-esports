/*
  牧野电竞 · 价目表数据
  ==================
  你以后主要只需要改这个文件 + images 文件夹。

  1）更新旧图片：
     保持图片文件名不变，直接替换 images 里对应图片即可。

  2）新增价目表：
     在对应分类的 items: [ ... ] 里复制一组 { ... }，
     修改 title / image / description 即可。

  图片路径建议只用英文文件名，最不容易出问题。
*/

window.MUYE_DATA = {
  categories: [
    {
      id: "basic",
      emoji: "💰",
      title: "基础价目表",
      subtitle: "基础服务与常用价目",
      items: [
        {
          title: "基础价目表",
          image: "images/basic/basic-price.svg",
          description: "这里替换成你的基础价目表长图。"
        },
        {
          title: "保底 / 常用项目",
          image: "images/basic/guarantee.svg",
          description: "可继续添加店内常用项目。"
        }
      ]
    },
    {
      id: "fun",
      emoji: "🎲",
      title: "趣味单",
      subtitle: "牧野原创与特色趣味玩法",
      items: [
        {
          title: "数字炸弹",
          image: "images/fun/digital-bomb.svg",
          description: "趣味单示例卡片，可直接替换图片。"
        },
        {
          title: "草原上的世纪婚礼",
          image: "images/fun/wedding.svg",
          description: "趣味单示例卡片，可直接替换图片。"
        },
        {
          title: "恋爱要从一束花开始",
          image: "images/fun/flower.svg",
          description: "趣味单示例卡片，可直接替换图片。"
        }
      ]
    },
    {
      id: "fortune",
      emoji: "🎴",
      title: "牧野の一日一签",
      subtitle: "每日限定 · 首局开签",
      items: [
        {
          title: "一日一签 · 总览",
          image: "images/fortune/overview.svg",
          description: "八签总览图。"
        },
        {
          title: "签文解析 · 壹",
          image: "images/fortune/detail-1.svg",
          description: "01—04 签文解析。"
        },
        {
          title: "签文解析 · 贰",
          image: "images/fortune/detail-2.svg",
          description: "05—08 签文解析。"
        }
      ]
    },
    {
      id: "rules",
      emoji: "📖",
      title: "下单须知",
      subtitle: "下单前请先阅读",
      items: [
        {
          title: "牧野电竞 · 下单须知",
          image: "images/rules/order-guide.svg",
          description: "店内下单、结算与服务说明。"
        }
      ]
    }
  ]
};
