 let form = document.getElementById("form");
 let input = document.getElementById("input");
 let from = document.getElementById("from");
 let to = document.getElementById("to");
 let calculate = document.getElementById("calculate");
 let tbd = document.getElementById("tbd");
 let result = document.getElementById("result");
 let deleteId = 0;

 function createOption(input, place, cValue) {
     let option = document.createElement("option");
     option.setAttribute("value", toNumber(cValue));
     let content = document.createTextNode(input);
     option.appendChild(content);
     place.appendChild(option);
 }

 function toNumber(x) {
     let removedComma = x.replace(",", "");
     return Number(removedComma);
 }

 for (x in data.rates) {
     createOption(x, from, data.rates[x]);
     createOption(x, to, data.rates[x]);
 }

 form.addEventListener("submit", e => {
     e.preventDefault();
     getData();
 });

 function getData() {
     let i = input.value;
     let f = from.value;
     let t = to.value;
     calculatedProcess(i, f, t);
 }

 function calculatedProcess(i, f, t) {
     let toMMK = i * f;
     let ans = (toMMK / t).toFixed(3);
     let date = new Date().toLocaleString();
     let fromText = i + " " + from.options[from.selectedIndex].innerHTML;
     toText = to.options[to.selectedIndex].innerHTML;
     let ary = [date, fromText, toText, ans];
     tbd.appendChild(createTr(ary));
     store();
     setData(ans);

 }

 function setData(ans) {
     result.innerHTML = ans;
     from.value = "";
     to.value = 1;
     input.value = "";
     input.focus();
 }

 function createTr(ary) {
     let tr = document.createElement("tr");
     let td = document.createElement("td");
     let btn = document.createElement("button");
     let icon = document.createElement("i");
     icon.setAttribute("class", "far fa-trash-alt")
     icon.setAttribute("onclick", `deleter(${deleteId})`);

     btn.appendChild(icon);
     td.appendChild(btn);
     let defaultTr = document.getElementById("defaultTr");
     if (defaultTr) {
         defaultTr.remove();
     }

     ary.map(function(el, index) {
         let td = document.createElement("td");
         let text = document.createTextNode(el);
         td.appendChild(text); //<td>text</td>
         tr.appendChild(td);
     });
     tr.setAttribute("id", `${deleteId}`);
     tr.appendChild(td);

     deleteId++;
     return tr;
 }

 function store() {
     localStorage.setItem("record", tbd.innerHTML);
 }



 (() => {
     if (localStorage.getItem("record")) {
         tbd.innerHTML = localStorage.getItem("record");
     } else {
         tbd.innerHTML = ` <tr id="defaultTr"> <td colspan="5">There is no data to show!</td ></tr>`;
     }
 })();

 function deleter(x) {
     let currentTr = document.getElementById(`${x}`);
     tbd.removeChild(currentTr);
 }