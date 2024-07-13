<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Order;

class InvoiceMail2 extends Mailable
{
    use Queueable, SerializesModels;

    public $auth;
    public $order;
    public $items;
    public $totalAmount;
    public $deliveryCharge;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($auth, Order $order, $items, $totalAmount, $deliveryCharge)
    {
        $this->auth = $auth;
        $this->order = $order;
        $this->items = $items;
        $this->totalAmount = $totalAmount;
        $this->deliveryCharge = $deliveryCharge;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.invoice2')
                    ->subject('Your Order Invoice')
                    ->with([
                        'auth' => $this->auth,
                        'order' => $this->order,
                        'items' => $this->items,
                        'totalAmount' => $this->totalAmount,
                        'deliveryCharge' => $this->deliveryCharge,
                    ]);
    }
}
