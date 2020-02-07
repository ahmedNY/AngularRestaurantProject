import { LocalStorageService } from 'src/app/services/storage/storage.service';
import { Injectable } from '@angular/core';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swall: SweetAlert = _swal as any;
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart =   this.storage.get('cart') || {
      // items: [],
      // DishNames: [],
      // Tables: [],
      // TableRID : '',
      // CompanyID: '',
      // MenuRID: '',
      // CategoryRID: '',
      // Amount: 0,
      // CustomerRID: 79,
      // CartID: 75,
      // Tables: [
      // ]
      items: []
};
  constructor(
    public storage: LocalStorageService
    ) { }
  /**
   * Calc items Amount Prize
   * @param items [{Prize: any, Quanity: any } ..]
   */
  calcTotalAmount(items) {
    return   this.cart.items.reduce((acc, item) =>
    acc + Number( Number(item.Prize)  *  Number(item.Quanity)) + Number(item.Tax), 0);
  }
  getTableId(item) {
    // this.cart.items.TableRID = item.RID;
    this.cart.items.TableRID = item.RID;
    // this.cart.items.push({RID: this.cart.items.TableRID});
    // this.cart.CompanyID = item.CompanyID;
    // if (!this.existtable(item))   {
    //   this.cart.Tables.push({RID: item.RID});
    // } else if (this.existtable(item)  ) {
    //   swall('The table in progressing now' +  '    '    +  item.TableName);
    // }
    // console.log(this.cart.Tables);
    // this.cart.items.push(item);
    // console.log(this.cart.items);
  }
  getMealId(item) {
    // this.cart.MenuRID = item.DishID;
    // this.cart.items.DishName = item.DishName;
    this.cart.items.DishName = item.DishName;
    // this.cart.items.push({DishName: this.cart.items.DishName});
  }
  public exist(item) {
    return this.cart.items.filter(elm => elm.CategoryId === item.CategoryId).length;
  }
  public existtable(item) {
    return this.cart.Tables.filter(elm => elm.RID === item.RID).length;
  }
   cartChanged() {
    // this.cart.items = this.cart.items.map(item => {
    //   item.Amount = item.Prize * item.Quanity;
    //   return item;
    // });
    // this.cart.Amount = this.calcTotalAmount(this.cart.items);
    // this.cart.Quanity = this.getItemCount();
    // this.storage.set('cart', this.cart);
  }
  increaseCount(item) {
    // if (!this.exist(item)) {
    //   item.Quanity = 1;
    //   this.cart.items.push(item);
    // } else {
    //   this.cart.items = this.cart.items.map(elm => {
    //     elm.Quanity = Number(elm.Quanity);
    //     if (elm.CategoryId === item.item.CategoryId) {
    //       elm.Quanity =  elm.Quanity + 1;
    //     }
    //     return elm;
    //   });
    // }
    // this.cartChanged();
    item.Quanity = item.Quanity + 1;
  }
  decreaseCount(item) {
    // this.cart.items = this.cart.items.map(elm => {
    //   if (elm.CategoryId === item.item.CategoryId) {
    //       elm.Quanity--;
    //   }
    //   return elm;
    // });
    // this.cartChanged();
    item.Quanity = item.Quanity - 1;

  }
  find(item) {
    return this.cart.items.filter(i => i.CategoryId === item.CategoryId)[0];
  }
  public deleteFromCart(item) {
    if (!this.exist(item)) { return; }
    item.isincart = false;
    this.cart.items = this.cart.items.filter(elm => elm.CategoryId !== item.CategoryId);
    // this.cart.DishNames = [];
    // this.cart.Tables = [];
    // if (!this.cart.items) {
    //   this.cart.CompanyID = '';
    //   this.cart.MenuRID = '';
    //   this.cart.CategoryRID = '';
    // }
    this.cartChanged();
    return this.cart;
  }
  clear() {
    // this.cart = {
    //   items: [],
    //   DishNames: [],
    //   Tables : [],
    //   CompanyID: '',
    //   MenuRID: '',
    //   CategoryRID: '',
    //   Amount: 0,
    //   CustomerRID: '',
    //   CartID: '',
    // };
    this.storage.remove('cart');
    this.cartChanged();
  }
addToCart(item) {
  // if (!this.exist(item))  {
  //   item.isincart = true;
  //   this.cart.CategoryRID = item.CategoryId;
  //   this.cart.items.push(item);
  //   this.cartChanged();
      // tslint:disable-next-line:no-shadowed-variable
      this.cart.items.push({
        RID: this.cart.items.TableRID,
        DishName: this.cart.items.DishName,
        item
      });
      // this.cart.items = this.cart.items.map(elm => {
      //   elm.TableRID = this.getTableId(elm);
      //   elm.DishName = this.getMealId(elm);
      //   console.log(this.getMealId(elm), 'elm');
      //   return elm;
      // });
      this.storage.set('cart', this.cart);
}
getCart() {
  return this.cart;
}
getItemCount() {
  return this.cart.items.reduce((acc, item) => acc + Number( Number(item.item.Quanity)), 0);
}
getItemTotalPrice() {
  return this.cart.items.reduce((acc, item) => acc + Number( Number(item.item.Prize)) * Number(item.item.Quanity), 0);
}
getFinalTAmount() {
  // tslint:disable-next-line:max-line-length
  return this.cart.items.reduce((acc, item) => acc + Number( Number(item.item.Prize)  *  Number(item.item.Quanity)) + Number(item.item.Tax), 0);
}
getTax() {
  return this.cart.items.reduce((acc, item) => acc + Number( Number(item.item.Tax)), 0);
}
getDisc() {
  return this.cart.items.reduce((acc, item) => acc + Number( Number(item.item.disc)), 0);
}
}
