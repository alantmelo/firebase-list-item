import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database'
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingItem = {} as ShoppingItem;

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public database: AngularFireDatabase, 
    private actionSheetCtrl: ActionSheetController) {
    this.shoppingListRef$ = this.database.list('shopping-list');
  }

  navigateToAddShoppingPage() {
    this.navCtrl.push("AddShoppingPage")
  }

  selectShoppingItem(shoppingItem:ShoppingItem) {
    let actionSheet = this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            // Send the user to the EditShoppingItemPage and pass the key as a parameter
            this.navCtrl.push("EditShoppingItemPage",
              { shoppingItemId: shoppingItem.$key });
            
            /*
             Navigation stack:
             
              ['ShoppingListPage',
               'EditShoppingItemPage',
               { shoppingItemId: '-KowULdyLOK4ruWoKhws'}]
            
            */
          }
        },{
          text: 'Delete',
          role:'destructive',
          handler: () => {
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
