const MENU_PRICE = {
    RED : {price : 50},
    GREEN : {price : 40},
    BLUE : {price : 30},
    YELLOW : {price : 50},
    PINK : { price : 80},
    PURPLE : {price : 90},
    ORANGE : {price : 120},
}

module.exports = function foodService(store) {
    const service = {};
  
    service.open = (numTable) => {
        if(store[numTable]) return false
        else{
            store[numTable] = { status : "Opened" }
            return store[numTable]
        }
    };

    service.addOrder = (orders,numTable) => {
        if(store[numTable]){
            if(!store[numTable].orders){
                store[numTable].orders = [
                    { name : "RED" , amount : 0 },
                    { name : "GREEN" , amount : 0 },
                    { name : "BLUE" , amount : 0 },
                    { name : "YELLOW" , amount : 0 },
                    { name : "PINK" , amount : 0 },
                    { name : "PURPLE" , amount : 0 },
                    { name : "ORANGE" , amount : 0 },
                ] 
            }
            updateOrder(numTable,orders)
            return true
        }else{
            return false
        }
    }

    function updateOrder(numTable,orders){
        store[numTable].orders.forEach(oldOrder => {
            orders.forEach(newOrder => {
                if(oldOrder.name == newOrder.name){
                    oldOrder.amount = oldOrder.amount + newOrder.amount
                }
            });
        });
        return orders
    }

    service.close = (numTable,isMember) => {
        if(store[numTable]){
            const orders = store[numTable].orders
            let totalPrice = 0;
            orders.forEach(order => {
                if(order.name == "GREEN" || order.name == "PINK" ||order.name == "ORANGE"){
                    const isOdd = order.amount % 2 != 0 ? true : false
                    const even = Math.floor(order.amount / 2)
                    totalPrice = isOdd ? totalPrice + (even * ((MENU_PRICE[order.name].price*95*2)/100)) + 40 : totalPrice + (even * ((MENU_PRICE[order.name].price*2*95)/100))
                }else{
                    totalPrice += order.amount * MENU_PRICE[order.name].price
                }
            });
            if(isMember){
                totalPrice = (totalPrice * 90)/100
            }
            delete store[numTable]
            return totalPrice
        }else{
            return false
        }
    };

    service.get = () => {
        return store
    }

    return service;
  };
  