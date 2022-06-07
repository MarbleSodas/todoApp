import React from 'react';

//styled components import
import { HeaderView, HeaderTitle, HeaderButton, colors } from './../styles/appStyle';

//Expo vector Icons
import { Entypo } from '@expo/vector-icons';

const Header = ({handleClearAllTodos}) => {
    return (
        <HeaderView>
            <HeaderTitle>Todos</HeaderTitle>
            <HeaderButton
                onPress={handleClearAllTodos}
            >
                <Entypo name="trash" size={25} color={colors.tertiary} />
            </HeaderButton>
        </HeaderView>
    );
}

export default Header;