<?php

namespace Bendani\PhpCommon\FilterService\Providers;

use Illuminate\Support\ServiceProvider;

class FilterServiceProvider extends ServiceProvider
{

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishes([__DIR__.'/../../../public' => public_path('vendor/bendani/php-common/filter-service'),], 'public');
    }


}