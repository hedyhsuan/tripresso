
let result=document.querySelector(".result");
let tags=document.querySelector(".tags");
let priceHight=document.querySelector("#priceHight");
let priceLow=document.querySelector("#priceLow");
let rateSort=document.querySelector("#rateSort");
let dayLess=document.querySelector("#dayLess");
let dayMore=document.querySelector("#dayMore");



let data=[];
let loc=new XMLHttpRequest();
loc.open("get","https://interview.tripresso.com/tour/search");
loc.send();
loc.onload=function(){
    let datas=JSON.parse(loc.responseText);
    // console.log(datas);
    data=datas.data.tour_list;
    //  console.log(data);

    // 初始畫面，所有資料onload
    allContent();

    // 點擊排序功能
    sortFunction();
    //建立頁數
    getTotalPages(data);
    //分頁功能
    pageReload();

    
}


function allContent(){
    
    let str="";
   
     for(i=0;i<5;i++){

         // 抓tag的迴圈
          let travelTag=data[i].tags;
        //   console.log(travelTag);
          let tags="";
         for(a=0;a<travelTag.length;a++){
         tags+=`<p>${travelTag[a]}</p>`
        //  console.log(tags);
      }
   
        // 抓出團日的迴圈
          let travelDate=data[i].group;

          let dates="";
      
          for(b=0;b<travelDate.length&&b<4;b++){
            // console.log(travelDate[b].date);
        //   let travelDay=travelDate[b].date;
            dates+=` <div class="d-inline-block">${travelDate[b].date}
                <div class="dateAvaliable">可售${travelDate[b].quantity}位</div>
               </div>
              `
            // console.log(travelDay);
          }
        str+=`
          
        <div class="tourBox mb-3">  
        <div class="imgGroup">
              <a href="${data[i].tour_detail_url}">
                 <div class="tourImg" style='background-image: 
                 url(${data[i].image_url})'>
                 </div>
              </a>
        </div>

        <div class="tourInfo">
              <div class="travelName">
                  <a><strong>${data[i].agency}</strong></a>
                
           
              </div>
              <div class="tourTitle"> 
                  <a href=""><h5>${data[i].title}</h5>
                  </a>
              </div>
              <div class="locate">
                  <i class="fa fa-map-marker" aria-hidden="true"></i>
                  <p>台南</p>
              </div>
              <div class="tags mt-2">
          
                 ${tags}
              </div>

         <hr class="my-2">

         <div class="dateBar">
              <div class="dateBox">
                 <a href="" class="ml-2">
               
                 ${dates}
                 <div class="d-inline-block more">更多日期 </div>
              
                  
                 </a>

          </div>

          <a>
              <div class="discountInfo text-right">
                <p class="dayPrice mb-0"><span>${data[i].tour_days}</span>天<span>${data[i].min_price}</span>元起</p>
                <p class="discountCoin mb-0"><span class="coin">咖</span>下單現賺咖幣<span class="money">$39</span>元起</p>

              </div>
          </a>
         </div>
      </div>
  </div>

        `
      
         
    }

    result.innerHTML=str;

}

// 自動分頁
function getTotalPages(aa) {
  let totalPages = Math.ceil(aa.length / 5) || 1;
  // console.log(totalPages);
  let pageItemContent = '';
  for (let i = 0; i < totalPages; i++) {
    pageItemContent += `
        <li class="page-item">
          <a class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
        </li>
      `
  }
  pagination.innerHTML = pageItemContent;
}


// 頁數點擊監聽
function pageReload(){
 
pagination.addEventListener('click', event => {
  event.preventDefault()
  if (event.target.tagName === 'A') {
    console.log(event.target.dataset.page);
   getPageData(event.target.dataset.page,data);
    
  }}
)
}


//篩選後的資料渲染
function getPageData(pageNum, data) {

  let paginationData;
  result.innerHTML = '' ;//清空現有內容
  paginationData = data || paginationData;
  // console.log(paginationData);
  let offset = (pageNum - 1) * 5;
  
  let pageData = paginationData.slice(offset, offset + 5);
  // console.log(pageData);
  //切掉前面頁數跟後面頁數的資料


  let sortStr="";
  for (let i = 0; i < pageData.length; i++) {
  
       // 抓tag的迴圈
       let travelTag=pageData[i].tags;
       //   console.log(travelTag);
         let tags="";
        for(a=0;a<travelTag.length;a++){
        tags+=`<p>${travelTag[a]}</p>`
       //  console.log(tags);
     }
  
       // 抓出團日的迴圈
         let travelDate=pageData[i].group;

         let dates="";
       //   console.log(travelDate[0].date);
         for(b=0;b<travelDate.length&&b<4;b++){
           // console.log(travelDate[b].date);
       //   let travelDay=travelDate[b].date;
           dates+=` <div class="d-inline-block">${travelDate[b].date}
               <div class="dateAvaliable">可售${travelDate[b].quantity}位</div>
              </div>
             `
           // console.log(travelDay);
         }

       sortStr+=`
         
       <div class="tourBox mb-3">  
       <div class="imgGroup">
             <a href="${pageData[i].tour_detail_url}">
                <div class="tourImg" style='background-image: 
                url(${pageData[i].image_url})'>
                </div>
             </a>
       </div>

       <div class="tourInfo">
             <div class="travelName">
                 <a><strong>${pageData[i].agency}</strong></a>
               
          
             </div>
             <div class="tourTitle"> 
                 <a href=""><h5>${pageData[i].title}</h5>
                 </a>
             </div>
             <div class="locate">
                 <i class="fa fa-map-marker" aria-hidden="true"></i>
                 <p>台南</p>
             </div>
             <div class="tags mt-2">
         
                ${tags}
             </div>

        <hr class="my-2">

        <div class="dateBar">
             <div class="dateBox">
                <a href="" class="ml-2">
              
                ${dates}
                <div class="d-inline-block more">更多日期 </div>
             
                 
                </a>

         </div>

         <a>
             <div class="discountInfo text-right">
               <p class="dayPrice mb-0"><span>${pageData[i].tour_days}</span>天<span>${pageData[i].min_price}</span>元起</p>
               <p class="discountCoin mb-0"><span class="coin">咖</span>下單現賺咖幣<span class="money">$39</span>元起</p>

             </div>
         </a>
        </div>
     </div>
 </div>

       `
     
    // console.log(sortStr);
  }
  result.innerHTML = sortStr;
}







// 篩選監聽
function sortFunction(){
   
  priceHigh.addEventListener("click",fromHigh);
  priceLow.addEventListener("click",fromLow);
  rateSort.addEventListener("click",rateHigh);
  dayLess.addEventListener("click",fromLess);
  dayMore.addEventListener("click",fromMore);

  


  function fromHigh(){
    data=data.sort(function(a,b){
      return b.min_price - a.min_price ;
       }) 
      // console.log(data);  
   
      allContent();

  }
  function fromLow(){
    data=data.sort(function(a,b){
      return a.min_price - b.min_price ;
       })   
      allContent();

  }

  function rateHigh(){
    data=data.sort(function(a,b){
return b.rating-a.rating;

    })
    console.log(data);  
    allContent();
  }

  function fromLess(){
    data.sort(function(a,b){
      return a.tour_days-b.tour_days;
    })
    allContent();

  }  

  function fromMore(){
    data.sort(function(a,b){
      return b.tour_days-a.tour_days;
    })
    allContent();

  }  


}
