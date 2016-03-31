<?php

namespace Bendani\PhpCommon\FilterService\Model;

use Bendani\PhpCommon\Utils\Ensure;

class FilterManager
{

    /** @var array  */
    private $filters;
    /** @var array  */
    private $handlers = array();

    private $filtersAsList;

    public function __construct($filters)
    {
        $this->filtersAsList = $filters;
        /** @var Filter $filter */
        foreach($filters as $filter){
            $this->filters[$filter->getFilterId()] = $filter;
        }
    }

    public function handle($handlerGroupId, FilterValue $filter, $object = null){
        Ensure::objectNotNull('handlerGroup', $this->handlers[$handlerGroupId]);

        /** @var FilterHandler $handler */
        $handler = $this->handlers[$handlerGroupId][$filter->getId()];
        Ensure::objectNotNull('handler for filter', $this->handlers[$handlerGroupId]);

        return $handler->handleFilter($filter, $object);
    }

    public function registerHandlers($handlerGroupId, $handlers){
        $this->handlers[$handlerGroupId] = $handlers;
    }

    public function getFilters()
    {
        return $this->filtersAsList;
    }

    public function getFilter($filterId){
        return $this->filters[$filterId];
    }
}