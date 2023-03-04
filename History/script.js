let historyDiv=document.querySelector(".historyDiv");

function displayHistory(){
    let history=JSON.parse(localStorage.getItem("bookHistory"))||[];
    historyDiv.innerHTML="";
    history.map((data,index)=>{
        let listDiv=document.createElement("div");
        listDiv.setAttribute("class","list_div");
        let search=document.createElement("p");
        search.textContent=`${index+1}. ${data.search}`;
        let time=document.createElement("p");
        time.textContent=`Searched On: ${data.date} at ${data.time}`;
        listDiv.append(search,time);
        historyDiv.append(listDiv);
        listDiv.addEventListener("click",()=>{
            let currBook={
                id:index+1,
                search:data.search,
                date:data.date,
                time:data.time
            }
            sessionStorage.setItem("currBook",JSON.stringify(currBook));
            window.location.href="../Search/searched.html";
        })
    })

}

displayHistory();

function clearFun(){
    window.localStorage.removeItem('bookHistory');
    displayHistory();

}