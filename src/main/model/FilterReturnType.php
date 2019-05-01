<?php
namespace Bendani\PhpCommon\FilterService\Model;


class FilterReturnType
{

    private $key = 'filter';
    private $clause = 'must';
    private $value;

    /**
     * FilterReturnType constructor.
     * @param $clause
     * @param $value
     */
    public function __construct($value, $clause)
    {
        $this->value = $value;
        $this->clause = $clause;
    }


    public function getKey(){
        return $this->key;
    }

    public function getValue(){
        return $this->value;
    }

    public function getClause()
    {
        return $this->clause;
    }
}
