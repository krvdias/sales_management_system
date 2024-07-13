<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public $material;
    public $quantity;
    public $invoiceNumber;
    public $totalPrice;
    public $auth;
    public $delevary;
    public $payment;
    

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($auth, $material, $quantity, $invoiceNumber,$delevary, $totalPrice, $payment)
    {
        $this->auth = $auth;
        $this->material = $material;
        $this->quantity = $quantity;
        $this->invoiceNumber = $invoiceNumber;
        $this->delevary = $delevary;
        $this->totalPrice = $totalPrice;
        $this->payment = $payment;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'))
                    ->subject('Your Invoice from SGP Materials')
                    ->view('emails.invoice');
    }
}
