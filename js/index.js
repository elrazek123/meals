let regularName=/^[a-z A-Z]{2,30}$/;
let regexLettter=/^[a-z]{1}$/;
let section_hidden=$(".left-section");
console.log(section_hidden);
let lists=document.querySelector(".icons-list")
console.log(lists);
let flagShow=false;
section_hidden.fadeOut();
$(".links-content").slideUp();
 console.log(section_hidden)
$(".icons-list").click(()=>
{
    if(flagShow===false)
    {
          section_hidden.fadeIn(1000,function()
          {
            $(".links-content").slideDown(500);
          })
          lists.classList.replace("fa-bars","fa-xmark");
        
          flagShow=true;
    }
  else
    {
        section_hidden.fadeOut(1000,function()
        {
          $(".links-content").slideUp(500);
        })
        lists.classList.replace("fa-xmark","fa-bars");
        flagShow=false;
    }
})
async function  requestId(id)
{
    let request= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let respons=await request.json();
    showMEealsDetails(respons)
    console.log(respons);
    
}
 async function requestDefault()
{  
    let requet= await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    let response=await requet.json();
    console.log(response);
    showDefauktMeals(response.meals);
}
function showDefauktMeals(response)
{
    $(".container-meals").siblings("div").hide();
    $(".big-container").show();

    let cartona=``;
for(let  i=0;i<20;i++)
{
    cartona+=`<div class="meals-div rounded-2" id=${response[i].idMeal}>
    <img src=${response[i].strMealThumb} alt="meal" class="rounded-2">
    <div class="layer">
    <h2>${response[i].strMeal}</h2>
    </div>
    </div>`;
}
$(".container-meals").html(cartona);
$(".meals-div").click(function(e)
{
console.log($(this).attr("id"));
let id=$(this).attr("id")
requestId(id);
})
}
function showMEealsDetails(response)
{
    let responseObject=Object.entries(response.meals[0]);
    responseObject=new Map(responseObject);
   let recipes=[];
   let title=response.meals[0].strMeal;
   let imgSrc=response.meals[0].strMealThumb;
   let instructions=response.meals[0].strInstructions;
   let area=response.meals[0].strArea;
   let tags=response.meals[0].strTags;
   let youSrc=response.meals[0].strYoutube;
   let mealSrc=response.meals[0].strSource;
   let category=response.meals[0].strCategory;
 
      responseObject.forEach((value,key)=>
      {
        if(key.includes("strMeasure")&&value!=null&&value!=undefined&&value!=""&&value!=''&&value[0]!='')
        {
           recipes.push(value);
        }
        else{
            console.log("no")
        }
      });
      recipesContainer=``;
      recipes.forEach(ele=>
        {
            recipesContainer+=`<div class="recipes-ingredients  rounded-2 mb-1 me-1">
            ${ele}
            </div>`
        });
        $(".recipes").html(recipesContainer);
        $(".area").html(area);
        $(".category").html(category);
        $(".meal-src").attr("src",imgSrc);
        $(".meal-srcc").attr("href",mealSrc);
        $(".meal-youtube").attr("href",youSrc);
        $(".tags").html(tags);
        $(".meal-title").html(title);
$(".meal-inst").html(instructions);
    $(".container-meals").hide();
    $(".meal").html();
    $(".meal").show();
    $(".meal").siblings("div").hide();
    $(".big-container").toggle();
    console.log("done");
    console.log(response);
    console.log(recipes);
}

async function requestSearchByFirstLetter(letter)
{
    let request=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let respnse=await request.json();
    console.log(respnse);
    showMealsByLtterOrName(respnse);
}
// function to show meqals by first letter:
function showMealsByLtterOrName(response) { 
   response=response.meals;
   let cartona=``;
for(let  i=0;i<response.length;i++)
{
    cartona+=`<div class="meals-div rounded-2" id=${response[i].idMeal}>
    <img src=${response[i].strMealThumb} alt="meal" class="rounded-2">
    <div class="layer">
    <h2>${response[i].strMeal}</h2>
    </div>
    </div>`;
}
$(".container-meals").show();
$(".container-meals").html(cartona);
$(".meals-div").click(function(e)
{
console.log($(this).attr("id"));
let id=$(this).attr("id")
requestId(id);
})

}
async function requestName(name)
{
    let request=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let response=await request.json();
    showMealsByLtterOrName(response);
}
// fucntion to show the ,els by name:
function regexLetter(regex,input)
{
    if(regex.test(input))
    {
        return true
    }
    else{
        return false;
    }
}
$(".search-input").click(function()
{
    let cotainer= `<input  class='search-lettrer text-white border-1 me-4 rounded-1' type='text'placeholder='search meals by first Letter'>
    <input  class='search-name text-white border-1 rounded-1' type='text'placeholder='search meals by name of meals'>`;  
       $(".inputs-div").html(cotainer);
        $(".inputs-div").siblings("div").hide();
        $(".big-container").hide();
        $(".right-section").show();
        flagShow=false;
        $(".big-container").show();
        $(".left-section").hide();
        $(".inputs-div").show();
        $(".icons-list").addClass("fa-bars").removeClass("fa-xmark");
        $(".search-lettrer").keyup(function()
        {
            if(regexLetter(regexLettter,$(this).val()))
            {
                requestSearchByFirstLetter($(this).val());
            }
            else
            {
                 console.log("the requersy will not send");
            }
        })
        $(".search-name").keyup(function()
        {
            if(regexLetter(regularName,$(this).val()))
            {
                console.log("the request is sended");
                requestName($(this).val());
            }
            else{
                   console.log("the condition doesn't come true ");
            }
        })
});
 async function requestMealsCategory(category)
{
    console.log(category);
    let request=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let response=await request.json();
showCategoriesMeals(response);
}
function showCategoriesMeals(response)
{
    $(".container-meals").html("");
    $(".container-meals").show();
    response=response.meals;
    console.log(response)
    let cartona=``;
    for(let  i=0;i<response.length;i++)
    {
        cartona+=`<div class="meals-div rounded-2" id=${response[i].idMeal}>
        <img src=${response[i].strMealThumb} alt="meal"  class="rounded-2">
        <div class="layer">
        <h2>${response[i].strMeal}</h2>
        </div>
        </div>`;
    }
    $(".container-meals").html(cartona);
    $(".meals-div").click(function(e)
{
console.log($(this).attr("id"));
let id=$(this).attr("id")
requestId(id);
})
}
async function requestCategories()
{
    let request=await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let response=await request.json();
    console.log(response);
showCategories(response);
}
$(".categories-input").click(function()
{
    $(".container-meals").siblings("div").hide();
    $(".big-container").show();
    $(".container-meals").html("");
    $(".icons-list").addClass("fa-bars").removeClass("fa-xmark");
    flagShow=false;
    requestCategories();
});
function showCategories(response)
{
  response=response.categories;
  let cartona=``;
  response.forEach(ele=>
 {
       cartona+=`<div class="categoty" id=${ele.strCategory}>
       <img src=${ele.strCategoryThumb} alt="categoty w-100 h-100" id=${ele.strCategory}>
       <div class="category-layer" id=${ele.strCategory}>
           <h2 class="w-100"id=${ele.strCategory}>${ele.strCategory}</h2>
           <h4 class="w-100" id=${ele.strCategory}>${ele.strCategoryDescription.slice(0,90)}</h4>
       </div>
       </div>`
 });
 $(".container-meals").html(cartona);
 $(".left-section").hide();
 $(".container-meals").show();
 $(".categoty").click((e)=>
 {
    console.log($(e.target).attr("id"))
    requestMealsCategory($(e.target).attr("id"));
 })
}
$(".area-input").click(function()
{
 
    $(".container-meals").siblings("div").hide();
    $(".big-container").show();
 $(".container-meals").html("");
 flagShow=false;
 $(".icons-list").addClass("fa-bars").removeClass("fa-xmark");
 requestAreas();
   
}
)
async function requestAreas()
{
    let request=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let response=await request.json();
    showAreas(response);

}
async function requestsMealsByArea(area)
{
let request=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
let response=await request.json();
showAreaMeals(response);
}
function showAreas(response)
{
let cartona=``;
     response=response.meals;
     response.forEach(ele=>
        {
                cartona+=`
                <div class="area-div m-3" id=${ele.strArea}>
                <h3 class="w-100" id=${ele.strArea}>${ele.strArea}</h3>
                <i class="fa-solid fa-house fs-2 fw-bold w-100" id=${ele.strArea}></i>
                </div>`;
        });
        $(".container-meals").show();
        $(".container-meals").html(cartona);
        console.log("yes")
        $(".area-div").click(function(e)
        {
            requestsMealsByArea($(e.target).attr("id"));
        })
}
function showAreaMeals(response)
{
    $(".container-meals").html("");
    $(".container-meals").show();
    response=response.meals;
    console.log(response)
    let cartona=``;
    for(let  i=0;i<response.length;i++)
    {
        cartona+=`<div class="meals-div rounded-2" id=${response[i].idMeal}>
        <img src=${response[i].strMealThumb} alt="meal"  class="rounded-2">
        <div class="layer">
        <h2>${response[i].strMeal}</h2>
        </div>
        </div>`;
    }
    $(".container-meals").html(cartona);
    $(".meals-div").click(function(e)
    {
        requestId($(this).attr("id"));
    })
}
async function requestIngredientrs()
{
    let request=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    let response =await request.json();
    console.log(response);
    showIngerdients(response);
}
$(".ingredients-input").click(function()
{
    $(".container-meals").siblings("div").hide();
    $(".big-container").show();
    $(".container-meals").html("");
    $(".left-section").hide();
    flagShow=false;
    $(".icons-list").addClass("fa-bars").removeClass("fa-xmark");
    requestIngredientrs();
});
async function requestMealsIngredients(Ingrediets)
{
    let request= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingrediets}`);
    let response =await request.json();
    showMealsByIngredients(response);
}
function showIngerdients(response)
{
    let cartona=``;
    response=response.meals;
    response.forEach(ele=>
       {
         let r=ele.strIngredient;
         if(r.includes(" "))
         {
             r=r.split(" ");
             r=r.join("_");
         }else{
               r=ele.strIngredient;
         }
               cartona+=`
               <div class="ingredients-div m-3 text-center" id=${r}>
               <h3 class="w-100" id=${r}>${ele.strIngredient}</h3>
               <i class="fa-solid fa-utensils fs-1 fw-bold w-100"></i> 
               </div>`;
       });
       $(".container-meals").show();
       $(".container-meals").html(cartona);
       $(".ingredients-div").click(function(e)
       {
            requestMealsIngredients($(this).attr("id"));
       })
}
function showMealsByIngredients(response)
{
    response=response.meals;
    let cartona=``;
 for(let  i=0;i<response.length;i++)
 {
     cartona+=`<div class="meals-div rounded-2" id=${response[i].idMeal}>
     <img src=${response[i].strMealThumb} alt="meal"  class="rounded-2">
     <div class="layer">
     <h2>${response[i].strMeal}</h2>
     </div>
     </div>`;
 }
 $(".container-meals").show();
 $(".container-meals").html(cartona);
 $(".meals-div").click(function(e)
 {
 console.log($(this).attr("id"));
 let id=$(this).attr("id")
 requestId(id);
 })
}
$(".contact-us-input").click(function()
{
    $(".contact-us").show();
    $(".contact-us").siblings("div").hide();
    $(".big-container").show();
    $(".left-section").hide();
    $(".icons-list").addClass("fa-bars").removeClass("fa-xmark");
    flagShow=false;
console.log("helo");
});
$(document).ready(function()
{
    $(".loader-layer").hide(21000,function()
    {
    });
    requestDefault();
})