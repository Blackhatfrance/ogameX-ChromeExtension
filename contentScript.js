if(typeof init === 'undefined'){
    const init = function(){

        if(!window.location.href.includes('empire')){
            
            // #####################################
            // ########     CONFIG AREA     ########
            // #####################################

            let options_planetList = true; //Enables the two column planet list (true/false)
            let options_galaxyView = true; //Enables all galaxy view adaptions (true/false)
            let options_searchButton = true; //Enables the searchbutton in the galaxy view (true/false)
            let options_playerRank = true; //Enables the player rank in the galaxy view (true/false)

            if(options_planetList){console.log("AddoneX -> Options: Planetlist feature is active.");} else{console.log("AddoneX -> Options: Planetlist feature is not active.");}
            if(options_galaxyView){console.log("AddoneX -> Options: Galaxy view is active.");} else{console.log("AddoneX -> Options: Searchbutton feature is not active.");}
            if(options_searchButton){console.log("AddoneX -> Options: Searchbutton feature is active.");} else{console.log("AddoneX -> Options: Searchbutton feature is not active.");}
            if(options_playerRank){console.log("AddoneX -> Options: Player rank feature is active.");} else{console.log("AddoneX -> Options: Searchbutton feature is not active.");}

            // ######## FEATURE: PLanetlist ########
            // #  Displays planets in two columns  #
            // #####################################

            if(options_planetList){
                let planetList = document.getElementsByClassName('planet-item');
                let planetListHalf = Math.ceil(planetList.length / 2);
                //Create left column and append children
                let divWrapperLeft = document.createElement("div");
                divWrapperLeft.setAttribute("id", "planetWrapperLeft");
                document.getElementById("other-planets").insertBefore(divWrapperLeft, document.getElementById("other-planets").children[0]);
                for(let i=0; i < planetListHalf; i++){
                    document.getElementById("planetWrapperLeft").appendChild(document.getElementsByClassName('planet-item')[i]);           
                }
                //Create right column and append children
                let divWrapperRight = document.createElement("div");
                divWrapperRight.setAttribute("id", "planetWrapperRight");
                document.getElementById("other-planets").insertBefore(divWrapperRight, document.getElementById("other-planets").children[1]);
                for(let i=planetListHalf; i < planetList.length; i++){
                    document.getElementById("planetWrapperRight").appendChild(document.getElementsByClassName('planet-item')[i]);           
                }
                //Change classes to display smaller text
                for(let i=0; i < planetList.length; i++){
                    let spanPlanetName = planetList[i].getElementsByClassName('planet-name');
                    spanPlanetName[0].classList.add('planet-coords');
                    spanPlanetName[0].classList.remove('planet-name');    
                }
                //Add style attribute to build the columns
                document.getElementById("other-planets").style.display = "flex";
                //Add width to game-bottom and planet-selection to make space for two columns
                document.getElementById("game-bottom").style.width = "1150px";
                document.getElementById("planet-selection").style.width = "300px";
            }
            /* END OF - FEATURE: PLanetlist */


            // ####### FEATURE: Galaxy View  #######
            // #    Some changes to the galaxy     #
            // #####################################

            //Domaincheck + Eventlisteners for galaxy navigation
            if(window.location.href.includes('galaxy')){
                if(options_galaxyView){
                    setTimeout(function(){
                        if(options_searchButton){addSearch();}
                        if(options_playerRank){addPlayerRank();}
                    }, 400);
                    //Get Gala or Sys change by input
                    document.addEventListener('keyup', () => {
                        setTimeout(function(){
                            if(options_searchButton){addSearch();}
                            if(options_playerRank){addPlayerRank();}
                        }, 400);
                    }, false);
                    //Get Gala or Sys change by button
                    let divGbuttonleft = document.getElementById('btnGalaxyLeft');
                    divGbuttonleft.addEventListener('click', () => {
                        setTimeout(function(){
                            if(options_searchButton){addSearch();}
                            if(options_playerRank){addPlayerRank();}
                        }, 400);
                    }, false);
                    let divGbuttonright = document.getElementById('btnGalaxyRight');
                    divGbuttonright.addEventListener('click', () => {
                        setTimeout(function(){
                            if(options_searchButton){addSearch();}
                            if(options_playerRank){addPlayerRank();}
                        }, 400);
                    }, false);
                    let divSbuttonleft = document.getElementById('btnSystemLeft');
                    divSbuttonleft.addEventListener('click', () => {
                        setTimeout(function(){
                            if(options_searchButton){addSearch();}
                            if(options_playerRank){addPlayerRank();}
                        }, 400);
                    }, false);
                    let divSbuttonright = document.getElementById('btnSystemRight');
                    divSbuttonright.addEventListener('click', () => {
                        setTimeout(function(){
                            if(options_searchButton){addSearch();}
                             if(options_playerRank){addPlayerRank();}
                        }, 400);
                    }, false);
                    
                    //Function for searchbutton
                    function addSearch (){
                        let domain_splitted_1 = window.location.origin.split('.')[0];
                        let universe = domain_splitted_1.split('/')[2];
                        let galColumn = document.getElementsByClassName('galaxy-col col-player');
                        for(let i=1; i < galColumn.length; i++){
                            let span = galColumn[i].getElementsByTagName('span');
                            if(span[0].innerHTML !== ""){
                                let spanTooltip = span[0].attributes[2].textContent;
                                let spanContent = span[0].innerHTML;
                                let cleanedContent = spanContent.replace(' ...','');
                                let contentCleanedFront = spanTooltip.substring(spanTooltip.indexOf(cleanedContent) + 0);
                                let playerName = contentCleanedFront.substring(0, contentCleanedFront.indexOf('</span>'));
                                let linkRX = 'https://raider-x.com/index.php?page=phunter&kind=1&uni=' + universe + '&term=' + playerName;
                                if(!span[0].innerHTML.includes('raider-x')){
                                    span[0].innerHTML = spanContent + ' <a href="' + linkRX +
                                        '" target="_blank"><img style="border-radius: 50%;" src="https://i.ibb.co/KwRjPTP/RXsearch.png" alt="RXsearch" border="0"></a>';
                                }
                            }
                        }
                    } /* END OF - Function: Search button */


                    //Function for player rank
                    function addPlayerRank (){
                        let galColumn = document.getElementsByClassName('galaxy-col col-player');
                        for(let i=1; i < galColumn.length; i++){
                            let span = galColumn[i].getElementsByTagName('span');
                            if(span[0].innerHTML !== ""){
                                let spanTooltip = span[0].attributes[2].textContent;
                                let spanContent = span[0].innerHTML;
                                let contentCleanedFront = spanTooltip.substring(spanTooltip.indexOf("statistics?rel") + 53);
                                let rank = contentCleanedFront.substring(0, contentCleanedFront.indexOf('</a>'));
                                if(!span[0].innerHTML.includes(rank)){
                                    span[0].innerHTML = '<span style=\"color:grey;\">' + rank + ' |</span> ' + spanContent;
                                }
                            }
                        }
                    } /* END OF - Function: Player rank */
                }
            }else{
                console.log("AddoneX -> Galaxy feature: Not in galaxy view.");
            } /* END OF - FEATURE: Galaxy View */
        }
    }
    init();
}