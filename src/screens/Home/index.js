import React, { useState } from 'react';
import  Alert  from 'react-native';

import {
    Container,
    Animation,
    Button,
    ButtonText,
    AddressArea,
    Text,
} from './styles';
import api from '../../services/api';


export default function Home() {
    const [livro, setLivro] = useState('');
    const [address, setAddress] = useState(null);

    async function handleBuscar() {
        try {
            const { status, data } = await api.get(`${livro}`);
            console.log(data)

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'Digite um livro válido.');
            } else {
                setAddress(data);
            }

        } catch (error) {
            Alert.alert('Buscar', 'Digite um livro válido');
        }
    };

    async function handleLimpar() {
        setAddress(null);
        setLivro('');
    }
    const { book, chapter, text } = address || {};
    return (
        <Container>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >     

                <Button
                    activeOpacity={0.8}
                    onPress={address ? handleLimpar : handleBuscar}>
                    <ButtonText>
                        {address ? 'Limpar' : 'Capítulo Bíblico aleatório'}
                    </ButtonText>
                </Button>
            </Animation>

            {address &&
            <Animation
            animation="fadeInUp">
                <AddressArea>
                    <Text>Nome: {book.name}</Text>
                    <Text>Autor do Livro: {book.author}</Text>
                    <Text>Grupo: {book.group}</Text>
                    <Text>Capítulo: {chapter}</Text>
                    <Text>Texto: {text}</Text>
                </AddressArea>
            </Animation>
            }
            
        </Container>
    );
}