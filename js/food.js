class Food{

    constructor(){

    }

    foodCount(){
    var foodref=database.ref("food");
    foodref.on("value",function(data){
    foodcount=data.val();
    });
    }
    
    updatefood(foodstock){
       
     database.ref("food").set({
     food : foodstock
    })
    
    }
    
}

