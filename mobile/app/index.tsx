import { StatusBar } from 'expo-status-bar';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import { useEffect } from 'react';
import { useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as SecureStore from 'expo-secure-store'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/lib/api';

const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/3bde9a3521b9f419c5b3',
};

export default function App() {
    const router = useRouter()

    const [request, response, signInWithGithub] = useAuthRequest(
        {
            clientId: '3bde9a3521b9f419c5b3',
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                scheme: 'nlwspacetime'
            }),
        },
        discovery
    );

    async function handleGithubOAuthCode(code: string) {
        try {

            const response = await api.post('/register', {
                code,
            })
            
            const { token } = response.data
            
            await SecureStore.setItemAsync('token', token)
            
            router.push('/memories')
        } catch(e) {
            console.error(e)
        }
    }

    useEffect(() => {
        // console.log(
        //     makeRedirectUri({
        //         scheme: 'nlwspacetime'
        //     }),
        // )

        if (response?.type === 'success') {
            const { code } = response.params;

            handleGithubOAuthCode(code)
        }
    }, [response]);



    return (
        <View className="flex-1 px-8 py-10 items-center">

            <View className="flex-1 items-center justify-center gap-6">
                <NLWLogo />

                <View className="space-y-2">

                    <Text className="text-center font-title text-2xl leading-tight text-gray-50">
                        Your time capsule
                    </Text>

                    <Text className="text-center font-body text-base leading-relaxed text-gray-100">
                        Collect memorable moments from your journey and share (if you like) with the world!
                    </Text>

                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="rounded-full bg-green-500 px-5 py-3"
                    onPress={() => signInWithGithub()}
                >
                    <Text className="font-alt text-sm uppercase text-black">
                        Register memory
                    </Text>
                </TouchableOpacity>

            </View>

            <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
                Feito com 💜 no NLW da Rocketseat
            </Text>

            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
