<?php

namespace Teaocha\SonataAdminImagePanelBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\Reference;

class RequestHandlerPass implements CompilerPassInterface
{
	public function process(ContainerBuilder $container)
    {
        $definition = $container->findDefinition(
            'teaocha.image_panel.request_handler_provider'
        );

        $taggedServices = $container->findTaggedServiceIds(
            'teaocha.image_panel.request_handler'
        );
		
		if (count($taggedServices) === 0) {
            throw new \Exception("Teaocha Image Panel requires a request handler service. None were tagged");
        }
		
        foreach ($taggedServices as $id => $tags) {
            $definition->addMethodCall(
                'setHandler',
                array(new Reference($id))
            );
        }
    }
}
