<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class LowQuantityNotification2 extends Mailable
{
    use Queueable, SerializesModels;

    public $lowQuantityMaterials;
    public $user;

    /**
     * Create a new message instance.
     *
     * @param  array  $lowQuantityMaterials
     * @param  \App\Models\User  $user
     * @return void
     */
    public function __construct($lowQuantityMaterials, User $user)
    {
        $this->lowQuantityMaterials = $lowQuantityMaterials;
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Low Quantity Alert')
                    ->view('emails.low_quantity_notification2');
    }
}
