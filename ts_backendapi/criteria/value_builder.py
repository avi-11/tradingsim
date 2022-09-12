
criteria1 = ['Value', 'Operator', 'Indicator', 'Ind_parameter']
criteria2 = ['Value', 'Operator', 'Indicator']
criteria3 = ['Indicator', 'Ind_parameter', 'Operator', 'Value']
criteria4 = ['Indicator', 'Operator', 'Value']

criteria5 = ['Indicator', 'Ind_parameter',
             'Operator', 'Indicator2', 'Ind_parameter2']
criteria6 = ['Indicator', 'Ind_parameter', 'Operator', 'Indicator2']
criteria7 = ['Indicator', 'Operator', 'Indicator2', 'Ind_parameter2']
criteria8 = ['Indicator', 'Operator', 'Indicator2']
criteria9 = ['Indicator2', 'Ind_parameter2',
             'Operator', 'Indicator', 'Ind_parameter']
criteria10 = ['Indicator2', 'Ind_parameter2', 'Operator', 'Indicator']
criteria11 = ['Indicator2', 'Operator', 'Indicator', 'Ind_parameter']
criteria12 = ['Indicator2', 'Operator', 'Indicator']

criteria13 = ['Value', 'Operator', 'Value2']
criteria14 = ['Value2', 'Operator', 'Value']

criteria1a = ['Price', 'Operator', 'Indicator', 'Ind_parameter']
criteria2a = ['Price', 'Operator', 'Indicator']
criteria3a = ['Indicator', 'Ind_parameter', 'Operator', 'Price']
criteria4a = ['Indicator', 'Operator', 'Price']
criteria13a = ['Price', 'Operator', 'Price2']
criteria14a = ['Price2', 'Operator', 'Price']


def value(criteriadic: dict) -> tuple:
    '''Args:
    criteriadic (dict): dict containing criteria parameters

    return: tuple with valueOne and valueTwo
    '''

    if list(criteriadic.keys()) == criteria1 or list(criteriadic.keys()) == criteria1a:

        if 'Price' in list(criteriadic.keys()):
            valueOne = criteriadic['Price']
            valueTwo = f"{criteriadic['Indicator']} {criteriadic['Ind_parameter']}"

        else:
            valueOne = criteriadic['Value']
            valueTwo = f"{criteriadic['Indicator']} {criteriadic['Ind_parameter']}"

        return valueOne, valueTwo

    elif list(criteriadic.keys()) == criteria2 or list(criteriadic.keys()) == criteria2a:

        if 'Price' in list(criteriadic.keys()):
            valueOne = criteriadic['Price']
            valueTwo = f"{criteriadic['Indicator']}"

        else:
            valueOne = criteriadic['Value']
            valueTwo = f"{criteriadic['Indicator']}"

        return valueOne, valueTwo

    elif list(criteriadic.keys()) == criteria3 or list(criteriadic.keys()) == criteria3a:

        if 'Price' in list(criteriadic.keys()):
            valueOne = f"{criteriadic['Indicator']} {criteriadic['Ind_parameter']}"
            valueTwo = criteriadic['Price']

        else:
            valueOne = f"{criteriadic['Indicator']} {criteriadic['Ind_parameter']}"
            valueTwo = criteriadic['Value']

        return valueOne, valueTwo

    elif list(criteriadic.keys()) == criteria4 or list(criteriadic.keys()) == criteria4a:

        if 'Price' in list(criteriadic.keys()):
            valueOne = f"{criteriadic['Indicator']}"
            valueTwo = criteriadic['Price']

        else:
            valueOne = f"{criteriadic['Indicator']}"
            valueTwo = criteriadic['Value']

        return valueOne, valueTwo

    elif list(criteriadic.keys()) == criteria5:

        valueOne = f"{criteriadic['Indicator']} {criteriadic['Ind_parameter']}"
        valueTwo = f"{criteriadic['Indicator2']} {criteriadic['Ind_parameter2']}"

        return valueOne, valueTwo

    elif list(criteriadic.keys()) == criteria6:

        valueOne = f"{criteriadic['Indicator']} {criteriadic['Ind_parameter']}"
        valueTwo = f"{criteriadic['Indicator2']}"

        return valueOne, valueTwo

    elif list(criteriadic.keys()) == criteria7:

        valueOne = f"{criteriadic['Indicator']}"
        valueTwo = f"{criteriadic['Indicator2']} {criteriadic['Ind_parameter2']}"

        return valueOne, valueTwo

    elif list(criteriadic.keys()) == criteria8:

        valueOne = f"{criteriadic['Indicator']}"
        valueTwo = f"{criteriadic['Indicator2']}"

        return valueOne, valueTwo

    elif list(criteriadic.keys()) == criteria9:

        valueTwo = f"{criteriadic['Indicator']} {criteriadic['Ind_parameter']}"
        valueOne = f"{criteriadic['Indicator2']} {criteriadic['Ind_parameter2']}"

        return valueOne, valueTwo

    elif list(criteriadic.keys()) == criteria10:

        valueTwo = f"{criteriadic['Indicator']}"
        valueOne = f"{criteriadic['Indicator2']} {criteriadic['Ind_parameter2']}"

        return valueOne, valueTwo

    elif list(criteriadic.keys()) == criteria11:

        valueTwo = f"{criteriadic['Indicator']} {criteriadic['Ind_parameter']}"
        valueOne = f"{criteriadic['Indicator2']}"

        return valueOne, valueTwo

    elif list(criteriadic.keys()) == criteria12:

        valueTwo = f"{criteriadic['Indicator']}"
        valueOne = f"{criteriadic['Indicator2']}"

        return valueOne, valueTwo

    elif list(criteriadic.keys()) == criteria13 or list(criteriadic.keys()) == criteria13a:

        if 'Price' in list(criteriadic.keys()):
            valueTwo = f"{criteriadic['Price2']}"
            valueOne = f"{criteriadic['Price']}"

        else:
            valueTwo = f"{criteriadic['Value2']}"
            valueOne = f"{criteriadic['Value']}"

        return valueOne, valueTwo

    elif list(criteriadic.keys()) == criteria14 or list(criteriadic.keys()) == criteria14a:

        if 'Price' in list(criteriadic.keys()):
            valueTwo = f"{criteriadic['Price']}"
            valueOne = f"{criteriadic['Price2']}"

        else:
            valueTwo = f"{criteriadic['Value']}"
            valueOne = f"{criteriadic['Value2']}"

        return valueOne, valueTwo

    else:
        valueOne = None
        valueTwo = None

        return valueOne, valueTwo
