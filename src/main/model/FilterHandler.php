<?php

namespace Bendani\PhpCommon\FilterService\Model;

interface FilterHandler
{

    public function handleFilter(FilterValue $filter, $object = null);

}