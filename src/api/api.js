import React, {Component} from 'react';
export function getArticles() {
  return fetch('http://news-at.zhihu.com/api/4/news/latest')
    .then(response => response.json())
    .catch(err => console.err(err));
}
export function getArticleContent(id) {
  return fetch(`http://news-at.zhihu.com/api/4/news/${id}`)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export function getContentStyle() {
  return fetch('http://daily.zhihu.com/css/share.css?v=5956a')
    .then(res => res.text())
    .catch(err => console.log('err', err));
}
