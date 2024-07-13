<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Material;
use App\Models\User;

class LowQuantityNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $material;
    public $user;

    /**
     * Create a new message instance.
     *
     * @param  \App\Models\Material  $material
     * @param  \App\Models\User  $user
     * @return void
     */
    public function __construct(Material $material, User $user)
    {
        $this->material = $material;
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
                    ->view('emails.low_quantity_notification');
    }
}
