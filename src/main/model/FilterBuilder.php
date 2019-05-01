<?php

namespace Bendani\PhpCommon\FilterService\Model;


use Bendani\PhpCommon\Utils\StringUtils;

class FilterBuilder
{

    public static function wildcard($field, $wildcard){
        return new FilterReturnType(['must' => ['wildcard' => [$field => StringUtils::toLowerCase($wildcard)]]]);
    }

    public static function terms($field, $values){
        $values = self::toLowerCase($values);

        return new FilterReturnType(['must' => ['terms' => [$field => $values]]]);
    }

    public static function notTerms($field, $values){
        $values = self::toLowerCase($values);

        return new FilterReturnType(['must_not' => ['terms' => [$field => $values]]]);
    }

    public static function match($field, $value){
        return new FilterReturnType(['must' => ['match' => [$field => $value]]]);
    }

    public static function term($field, $value){
        return new FilterReturnType(['must' => ['term' => [$field => $value]]]);
    }

    public static function missing($field){
        return new FilterReturnType(['must_not' => ['exists' => ['field' => $field]]]);
    }

    public static function exists($field){
        return new FilterReturnType(['must' => ['exists' => ['field' => $field]]]);
    }

    public static function range($field, $greaterThan, $lessThan){
        return new FilterReturnType(['must' => ['range' => [$field => [
            'gte' => $greaterThan,
            'lte' => $lessThan,
        ]]]]);
    }

    public static function greaterThan($field, $value){
        return new FilterReturnType(['must' => ['range' => [$field => [
            'gte' => $value
        ]]]]);
    }
    public static function lessThan($field, $value){
        return new FilterReturnType(['must' => ['range' => [$field => [
            'lte' => $value
        ]]]]);
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
