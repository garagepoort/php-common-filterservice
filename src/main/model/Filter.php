<?php

namespace Bendani\PhpCommon\FilterService\Model;

interface Filter
{
    public function getFilterId();

    public function getGroup();

    public function getType();

    public function getField();

    public function getSupportedOperators();
}