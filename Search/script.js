let url="https://www.googleapis.com/books/v1/volumes?q=";
let history=JSON.parse(sessionStorage.getItem("currBook"));
let historyDiv=document.querySelector(".historyDiv");
let bookShelf=document.querySelector(".bookShelf");

function displayResult(){
    displayHistory();
    searchBooks();
}
displayResult();
function displayHistory(){
    let listDiv=document.createElement("div");
        listDiv.setAttribute("class","list_div");
        let search=document.createElement("p");
        search.textContent=`${history.id}. ${history.search}`;
        let time=document.createElement("p");
        time.textContent=`Searched On: ${history.date} at ${history.time}`;
        listDiv.append(search,time);
        historyDiv.append(listDiv);
}

function searchBooks(){
    fetch(`${url}+${history.search}`)
    .then((res)=>res.json())
    .then((data)=>displayBooks(data.items))
    .catch((err)=>console.log(err.message))
}

function displayBooks(items){
    bookShelf.innerHTML="";

    items.map((item)=>{
        let book=item.volumeInfo;
        let bookBox=document.createElement("div");
        bookBox.setAttribute("class","bookBox");
        let bookImgDiv=document.createElement("div");
        bookImgDiv.setAttribute("class","bookImgDiv");
        let bookCover=document.createElement("img");
        bookCover.src=book.imageLinks.thumbnail;
        bookImgDiv.append(bookCover);
        let desc=document.createElement("div");
        desc.setAttribute("class","bookDesc");
        let title=document.createElement("p");
        title.setAttribute("class","title");
        title.textContent=book.title;
        let author=document.createElement("p");
        author.innerHTML=`<strong>Author:</strong> ${book.authors}`;
        let pageCount=document.createElement("p");
        pageCount.innerHTML=`<strong>Page Count:</strong> ${book.pageCount}`;
        let publisher=document.createElement("p");
        publisher.innerHTML=`<strong>Publisher:</strong> ${book.publisher}`;
        desc.append(title,author,pageCount,publisher);
        let buyDiv=document.createElement("div");
        buyDiv.setAttribute("class","buyDiv");
        let buyButton=document.createElement("button");
        buyButton.setAttribute("class","buyBtn");
        buyButton.innerText="Buy Now";
        buyDiv.append(buyButton);
        bookBox.append(bookImgDiv,desc,buyDiv);
        bookShelf.append(bookBox);
    })
}

