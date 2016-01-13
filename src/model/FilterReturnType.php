<?php
namespace Bendani\PhpCommon\FilterService\Model;


class FilterReturnType
{

    private $key = 'filter';
    private $value;

    /**
     * FilterReturnType constructor.
     * @param $key
     * @param $value
     */
    public function __construct($value)
    {
        $this->value = $value;
    }


    public function getKey(){
        return $this->key;
    }

    public function getValue(){
        return $this->value;
    }

}