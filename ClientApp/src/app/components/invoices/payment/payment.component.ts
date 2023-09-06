import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { AppComponent } from '../../../app.component';
import { invoicesModel } from '../../../models/invoices.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;


  public amount = 0;
  public order: invoicesModel = new invoicesModel();
  constructor(private router: Router, private payment: PaymentService, private app: AppComponent
  ) { }
  ngOnInit() {
    this.amount = this.payment.totalAmount;
    window.paypal.Buttons({
      style: {
        color: 'blue',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.amount.toString(),
              currency_code: 'USD'
            }
          },
          ]
        })
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          if (details.status == "COMPLETED") {
            this.order.idPerson = this.payment.person_id;
            this.order.orderId = details.id;
            this.order.createTime = details.create_time;
            this.order.updateTime = details.update_time;
            this.order.purchaseUnits = details.purchase_units;
            this.order.status = details.status;
            this.order.payer = details.payer;
            return this.payment.success(this.order).subscribe({
              next: data => {
                console.log(this.order)
                console.log(details)
                this.payment.transactionID = details.id;
                this.app.Toast.fire({
                  icon: 'success',
                  title: 'Succesfully! Transaction ID: ' + this.payment.transactionID
                })
                this.router.navigate(['invoices'])
              }
            })

          }
        })
      },
      onError: (error: any) => {
        console.log(error);
      }
    }).render(this.paymentRef.nativeElement)
  }


}
