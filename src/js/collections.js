import '../scss/collections.scss';

import Header from '../components/header/index';
import NoContentTip from '../components/no-content/index';
import NewsItem from '../components/news-item';

import tools from '../utils/tools';

const header = new Header(),
      noContentTip = new NoContentTip(),
      newsItem = new NewsItem();

const App = ($) =>{
    const $app = $('#app'),
          $list = $app.children('.list'),
          collections = JSON.parse(localStorage.getItem('collections'));

    const init = () => {
        render().then(bindEvent);
    }

    const render = () => {
        return new Promise((resolve,reject)=>{
            _renderHeader();

            if(!collections || Object.keys(collections).length === 0){
                _renderNnContentTip('没有收藏新闻');
            } else {
                _renderList(collections);
                tools.thumbShow('.news-thumb');
            }
            resolve();
       })
         
    }

    const bindEvent = () => {
        $list.on('click','.news-item', toDetailPage);
    }

    const _renderHeader = () => {
        $app.append(header.tpl({
            title:"我的收藏",
            showLeftIcon: true,
            showRightIcon: false
        }))
    }


    const _renderNnContentTip = (text) => {
        $app.append(noContentTip.tpl(text));
    }

    const _renderList = (data) => {
        $list.append(newsItem.tpl(_arrangeDatas(data)));
    }

    const _arrangeDatas = (data) => {
        let _arr = [];

        for (let key in data){
            _arr.push(collections[key])
        }
        return _arr;
    }

    function toDetailPage (){
        const $this = $(this),
              url = $this.attr('data-url'),
              uniquekey = $this.attr('data-uniquekey');

        localStorage.setItem('target',JSON.stringify(collections[uniquekey]));
        window.location.href = `detail.html?news_url=${url}&uniquekey${uniquekey}`;
    }

    init();
}

App(Zepto);