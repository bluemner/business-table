"use strict"
var businessTable = {
    init: function () {
        this.hiddenAttribute();
        this.iconTag();
        this.searchTag();
        this.filterTag();
    },
    hiddenAttribute: function () {
        //Get list of body tags and hide all
        var businessBodyList = document.getElementsByTagName('business-body');
        for (var i = 0; i < businessBodyList.length; i++) {
            if (businessBodyList[i].hidden) {
                businessBodyList[i].style.display = 'none';
            }
        }
    },
    
    //this method handels the closing and opeing of icon tags
    iconTag: function () {

        var businessIconList = document.getElementsByTagName('business-icon');

        for (var i = 0; i < businessIconList.length; i++) {
            //add plus for init load
            businessIconList[i].classList.add("business-table-plus");        
            
            //Register an on click event
            businessIconList[i].addEventListener("click", this.iconEvent, false);
        }
    },
    iconEvent: function(e){
        var icon = e.target || e.srcElement || e.originalTarget;
                var header = icon.parentNode || icon.srcElement || icon.originalTarget;
                var table = header.parentNode || header.srcElement || header.originalTarget;
                var businessbody = table.getElementsByTagName('business-body');
                businessbody[0].hidden = !businessbody[0].hidden;
                if (businessbody[0].hidden) {

                    businessbody[0].style.display = 'none';
                    icon.classList.add("business-table-plus");
                    icon.classList.remove("business-table-minus");

                } else {

                    businessbody[0].style.display = '';
                    icon.classList.remove("business-table-plus");
                    icon.classList.add("business-table-minus");
                }
    },
    searchTag: function () {
        var businessSearchList = document.getElementsByTagName('business-search');
        for (var i = 0; i < businessSearchList.length; i++) {

            var search = businessSearchList[i];

            var searchHtml = '<input type="search">'
            search.innerHTML = search.innerHTML + searchHtml;

            var searchButtonList = search.getElementsByTagName('input');
            //search.gete
            for (var j = 0; j < searchButtonList.length; j++) {
                searchButtonList[i].addEventListener("search", this.seachEvent);
                searchButtonList[i].addEventListener("keyup", this.seachEvent);
                searchButtonList[i].addEventListener("click", this.seachEvent);


            }
        }

    },
    seachEvent: function (e) {
        var searchbox = e.target || e.srcElement || e.originalTarget;
        var businessSearch = searchbox.parentNode || searchbox.srcElement || searchbox.originalTarget;
        var table = businessSearch.parentNode || businessSearch.srcElement || businessSearch.originalTarget;
        var businessBodyList = table.getElementsByTagName('business-body');
        var businessDataList = table.getElementsByTagName('business-data');
        var businessRowList = table.getElementsByTagName('business-row');
        for (var k = 0; k < businessBodyList.length; k++) {
            var bodyFirstIndex = businessBodyList[k].textContent.toLowerCase().indexOf(searchbox.value.toLowerCase());
            var dataFirstIndex = businessDataList[k].textContent.toLowerCase().indexOf(searchbox.value.toLowerCase());

            if (searchbox.value === '' || bodyFirstIndex != -1 || dataFirstIndex != -1) {


                businessRowList[k].style.display = '';
            } else {

                businessRowList[k].style.display = 'none';
            }

        }
    },
    filterTag: function () {
        var businessFilterList = document.getElementsByTagName('business-filter');
        for (var i = 0; i < businessFilterList.length; i++) {
            var filter = businessFilterList[i];

            var table = filter.parentNode || filter.srcElement || filter.originalTarget;
            var businessTitleList = table.getElementsByTagName('business-title');
            var filterHtml = filter.innerHTML + '';

            for (var j = 0; j < businessTitleList.length; j++) {
                filterHtml += '<input type="checkbox" value="' + j + '" checked>' + businessTitleList[j].textContent;//innerText;
            }

            filter.innerHTML = filterHtml;
            var fitlerCheckList = filter.getElementsByTagName('input');
            for (var j = 0; j < fitlerCheckList.length; j++) {

                var businessHeaderList = table.getElementsByTagName('business-header');
                                
                //Update with on load
                var checkboxesCheckedList = [];
                var fitlerCheckListAfter = filter.getElementsByTagName('input');
                for (var k = 0; k < fitlerCheckListAfter.length; k++) {
                    if (fitlerCheckListAfter[k].checked) {
                        checkboxesCheckedList.push(k);
                    }
                }
                var calc = (1 / checkboxesCheckedList.length * 100) - ((0.05) * (1 / checkboxesCheckedList.length * 100));
                var newWidth = '' + calc + '%';
                //Add hidden                    
                for (var k = 0; k < businessHeaderList.length; k++) {
                    var businessTitleList = businessHeaderList[k].getElementsByTagName('business-title');

                    for (var l = 0; l < businessTitleList.length; l++) {
                        businessTitleList[l].style.width = newWidth;
                    }


                }
                var businessDataList = table.getElementsByTagName('business-data');
                for (var k = 0; k < businessDataList.length; k++) {
                    var businessColList = businessDataList[k].getElementsByTagName('business-col');
                    for (var l = 0; l < businessColList.length; l++) {
                        businessColList[l].style.width = newWidth;
                    }


                }    
                //Filter check mark is clicked
                fitlerCheckList[j].addEventListener("click", this.filterEvent);
            }
        }
    },//filterTag
    filterEvent: function (e) {
        var checkbox = e.target || e.srcElement || e.originalTarget;
        var filter = checkbox.parentNode || checkbox.srcElement || checkbox.originalTarget;
        var table = filter.parentNode || filter.srcElement || filter.originalTarget;
        var businessHeaderList = table.getElementsByTagName('business-header');
                
        //Update with  
        var checkboxesCheckedList = [];
        var fitlerCheckListAfter = filter.getElementsByTagName('input');
        for (var k = 0; k < fitlerCheckListAfter.length; k++) {
            if (fitlerCheckListAfter[k].checked) {
                checkboxesCheckedList.push(k);
            }
        }
        var calc = (1 / checkboxesCheckedList.length * 100) - ((0.05) * (1 / checkboxesCheckedList.length * 100));
        var newWidth = '' + calc + '%';  
                
        //Add hidden                    
        for (var k = 0; k < businessHeaderList.length; k++) {
            var businessTitleList = businessHeaderList[k].getElementsByTagName('business-title');
            if (checkbox.checked) {
                businessTitleList[checkbox.value].style.display = '';
            } else {

                businessTitleList[checkbox.value].style.display = 'none';
            }
            for (var l = 0; l < businessTitleList.length; l++) {
                businessTitleList[l].style.width = newWidth;
            }
        }
        var businessDataList = table.getElementsByTagName('business-data');
        for (var k = 0; k < businessDataList.length; k++) {
            var businessColList = businessDataList[k].getElementsByTagName('business-col');
            if (checkbox.checked) {
                businessColList[checkbox.value].style.display = '';
            }
            else {
                businessColList[checkbox.value].style.display = 'none';
            }
            for (var l = 0; l < businessColList.length; l++) {
                businessColList[l].style.width = newWidth;
            }


        }

    }//filterEvent
}.init();
