<?php

namespace Bendani\PhpCommon\FilterService\Model;


interface Filter
{

    function getId();

    function getValue();

    function getOperator();

}