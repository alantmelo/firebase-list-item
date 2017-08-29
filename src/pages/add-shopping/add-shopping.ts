import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the AddShoppingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {
  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private database: AngularFireDatabase ) {
       this.shoppingItemRef$ = this.database.list('shopping-list');

      /*
        shopping-list:
          0:
            itemName: 'Pizza'
            itemNumber: '1'
          1:
            itemName: 'Cake'
            itemNumber: '3'
      
      */  
  }
  addShoppingItem(shoppingItem: ShoppingItem){
     /*
        shopping-list:
          Create a new anonymos object and convert interNumber to a number.
      */  
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    })

    this.shoppingItem = {} as ShoppingItem;

    this.navCtrl.pop();
  }

}
