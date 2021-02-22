import React from 'react';
import { Image, FlatList, View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const repositories = [
    {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears',
        language: 'TypeScript',
        forksCount: 1589,
        stargazersCount: 21553,
        ratingAverage: 88,
        reviewCount: 4,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
    },
    {
        id: 'rails.rails',
        fullName: 'rails/rails',
        description: 'Ruby on Rails',
        language: 'Ruby',
        forksCount: 18349,
        stargazersCount: 45377,
        ratingAverage: 100,
        reviewCount: 2,
        ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
    },
    {
        id: 'django.django',
        fullName: 'django/django',
        description: 'The Web framework for perfectionists with deadlines.',
        language: 'Python',
        forksCount: 21015,
        stargazersCount: 48496,
        ratingAverage: 73,
        reviewCount: 5,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
    },
    {
        id: 'reduxjs.redux',
        fullName: 'reduxjs/redux',
        description: 'Predictable state container for JavaScript apps',
        language: 'TypeScript',
        forksCount: 13902,
        stargazersCount: 52869,
        ratingAverage: 0,
        reviewCount: 0,
        ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
    },
];

const ItemSeparator = () => <View style={styles.separator} />;

const Item = ({ item, index, separators }) => {
    return (
        <View style={styles.cell}>
            <View style={styles.topSection}>
                <Image
                    style={styles.avatar}
                    source={{uri: item.ownerAvatarUrl}}/>
                <View style={styles.details} >
                    <Text style={styles.spacing} fontWeight="bold">{item.fullName}</Text>
                    <Text style={styles.spacing}>{item.description}</Text>
                    <Text style={[styles.languageLabel, styles.spacing]}>{item.language}</Text>
                </View>
            </View>
            <View style={styles.bottomSection}>
                <Stat number={item.stargazersCount} label="Stars" />
                <Stat number={item.forksCount} label="Forks" />
                <Stat number={item.reviewCount} label="Reviews" />
                <Stat number={item.ratingAverage} label="Rating" />
            </View>
        </View>
    );
};

const Stat = ({ number, label }) => {
    if (number >= 1000) {
        number -= number % 100;
        number = number / 1000;
        number += "K";
    }

    return (
        <View style={styles.stat}>
            <Text fontWeight="bold">{number}</Text>
            <Text>{label}</Text>
        </View>
    );
};

const RepositoryList = () => {
    return (
        <FlatList
            style={styles.container}
            data={repositories}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={Item}/>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c4c4c4',
    },
    separator: {
        height: 12,
    },
    cell: {
        backgroundColor: '#ffffff',
        padding: 16,
    },
    topSection: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    avatar: {
        width: 64,
        height: 64,
        marginEnd: 12,
        borderRadius: 4,
    },
    details: {
        flex: 1,
    },
    languageLabel: {
        color: '#ffffff',
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
        padding: 6,
        alignSelf: 'flex-start',
    },
    stat: {
        alignItems: 'center',
    },
    spacing: {
        marginBottom: 4,
    },
});

export default RepositoryList;
