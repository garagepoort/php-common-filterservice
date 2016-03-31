<?php

namespace Bendani\PhpCommon\FilterService\Model;


interface FilterValue
{

    function getId();

    function getValue();

    function getOperator();

}