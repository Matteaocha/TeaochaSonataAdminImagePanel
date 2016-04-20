<?php

namespace Teaocha\SonataAdminImagePanelBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Teaocha\SonataAdminImagePanelBundle\DependencyInjection\Compiler\RequestHandlerPass;

/**
 * Bundle.
 *
 * @author Matt Bilton <matteaocha@gmail.com>
 */
class TeaochaSonataAdminImagePanelBundle extends Bundle
{

	public function build(ContainerBuilder $container)
    {
        parent::build($container);

        $container->addCompilerPass(new RequestHandlerPass());
    }

}
