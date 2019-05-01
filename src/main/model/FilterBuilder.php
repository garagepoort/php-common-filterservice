<?php

namespace Bendani\PhpCommon\FilterService\Model;


use Bendani\PhpCommon\Utils\StringUtils;

class FilterBuilder
{

    public static function wildcard($field, $wildcard){
        return new FilterReturnType(['wildcard' => [$field => StringUtils::toLowerCase($wildcard)]], 'must');
    }

    public static function terms($field, $values){
        $values = self::toLowerCase($values);

        return new FilterReturnType(['terms' => [$field => $values]], 'must');
    }

    public static function notTerms($field, $values){
        $values = self::toLowerCase($values);

        return new FilterReturnType(['not' => ['terms' => [$field => $values]]], 'must');
    }

    public static function match($field, $value){
        return new FilterReturnType(['match' => [$field => $value]], 'must');
    }

    public static function term($field, $value){
        return new FilterReturnType(['term' => [$field => $value]], 'must');
    }

    public static function missing($field){
        return new FilterReturnType(['missing' => ['field' => $field]], 'must_not');
    }

    public static function exists($field){
        return new FilterReturnType(['exists' => ['field' => $field]], 'must');
    }

    public static function range($field, $greaterThan, $lessThan){
        return new FilterReturnType(['range' => [$field => [
            'gte' => $greaterThan,
            'lte' => $lessThan,
        ]]], 'must');
    }

    public static function greaterThan($field, $value){
        return new FilterReturnType(['range' => [$field => [
            'gte' => $value
        ]]], 'must');
    }
    public static function lessThan($field, $value){
        return new FilterReturnType(['range' => [$field => [
            'lte' => $value
        ]]], 'must');
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
