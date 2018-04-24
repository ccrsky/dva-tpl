import { parse } from 'url';
const authors= [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];
const articleType = ['科普', '宣传', '帮组', '指南', '答疑'];
const commentData = [];

// article 文章
export function commentList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      key: `${i}`,
      relAuthor: authors[parseInt(i / 10)],
      relArticle: '我有个梦想',
      category: articleType[parseInt(i / 5)],
      articleLink: 'https://www.baidu.com/',
      commitTime: new Date(new Date().getTime() - (1000 * 60 * 60 * 2 * i)),
      status: i % 5 === 0 ? '0': '1',
      content: `${authors[parseInt(i / 10)]}说：著名物理学家斯蒂芬霍金教授的家人周三凌晨发表声明，证实霍金教授在英格兰剑桥的家中去世，享年76岁。`, 
    });
  }
  return list;
}
export function getCommenList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const count = (params.count * 1) || 20;

  const result = articleList(count);

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getArticleList,
};
