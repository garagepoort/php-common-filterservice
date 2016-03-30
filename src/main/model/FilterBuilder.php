<?php

namespace Bendani\PhpCommon\FilterService\Model;


use Bendani\PhpCommon\Utils\Model\StringUtils;

class FilterBuilder
{

    public static function wildcard($field, $wildcard){
        return new FilterReturnType(['wildcard' => [$field => StringUtils::toLowerCase($wildcard)]]);
    }

    public static function terms($field, $values){
        $values = self::toLowerCase($values);

        return new FilterReturnType(['terms' => [$field => $values]]);
    }

    public static function notTerms($field, $values){
        $values = self::toLowerCase($values);

        return new FilterReturnType(['not' => ['terms' => [$field => $values]]]);
    }

    public static function match($field, $value){
        return new FilterReturnType(['match' => [$field => $value]]);
    }

    public static function term($field, $value){
        return new FilterReturnType(['term' => [$field => $value]]);
    }

    public static function missing($field){
        return new FilterReturnType(['missing' => ['field' => $field]]);
    }

    public static function exists($field){
        return new FilterReturnType(['exists' => ['field' => $field]]);
    }

    public static function range($field, $greaterThan, $lessThan){
        return new FilterReturnType(['range' => [$field => [
            'gte' => $greaterThan,
            'lte' => $lessThan,
        ]]]);
    }

    public static function greaterThan($field, $value){
        return new FilterReturnType(['range' => [$field => [
            'gte' => $value
        ]]]);
    }
    public static function lessThan($field, $value){
        return new FilterReturnType(['range' => [$field => [
            'lte' => $value
        ]]]);
    }

    /**
     * @param $values
     * @return array
     */
    private static function toLowerCase($values)
    {
        $values = array_map(function ($value) {
            if (is_string($value)) {
                $value = StringUtils::toLowerCase($value);
            }
            return $value;
        }, $values);
        return $values;
    }

}