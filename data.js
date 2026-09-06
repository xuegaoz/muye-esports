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
          image: "images/basic/basic-price.png",
          description: "汇总牧野电竞日常服务价格，包含体验单、物资保底单与陪玩小时单等基础项目。"
        },
        {
          title: "牧野礼物单",
          image: "images/basic/present-list.png",
          description: "为陪玩与护航准备的虚拟心意礼物，从小小心意到特别支持，都可以在这里自由选择。"
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
          image: "images/fun/number-bomb.png",
          description: "完成任务赢取猜数机会，范围越猜越小，命中秘密数字即可直接结单。"
        },
        {
          title: "干员淘汰赛",
          image: "images/fun/operator-knockout.jpg",
          description: "16名干员轮番上阵，用过即进入BAN位，完成3组干员挑战才算真正通关。"
        },
        {
          title: "利滚利",
          image: "images/fun/rolling-fortune.jpg",
          description: "五局内冲击小金与格红目标，未完成则触发“利息”，重新开启下一轮挑战。"
        },
        {
          title: "小金！给我上桌",
          image: "images/fun/little-gold.png",
          description: "点名指定小金或挑战重复收集，把随机出货变成一场越集越上头的收藏挑战。"
        },
        {
          title: "环太平洋",
          image: "images/fun/pacific-circuit-challenge.jpg",
          description: "在航天地图挑战多个不同撤离点，每成功解锁一站，向最终通关继续推进。"
        },
        {
          title: "航天黑洞单",
          image: "images/fun/black-hole-challenge.png",
          description: "指定航天黑洞收益被吞噬，完成非黑洞的有效撤离，解锁对应档位保底。"
        },
        {
          title: "BINGO连连看",
          image: "images/fun/bingo-challenge.png",
          description: "自选几连Bingo，带出对应物资点亮格子，完成连线即可通关。"
        },
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
          image: "images/fortune/overview.png",
          description: "八签总览图。"
        },
        {
          title: "签文解析 · 壹",
          image: "images/fortune/detail-1.png",
          description: "01—04 签文解析。"
        },
        {
          title: "签文解析 · 贰",
          image: "images/fortune/detail-2.png",
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
          image: "images/rules/order-guide.png",
          description: "店内下单、结算与服务说明。"
        }
      ]
    }
  ]
};
