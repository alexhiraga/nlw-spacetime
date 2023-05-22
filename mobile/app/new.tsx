import { Link, useRouter } from 'expo-router'
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Feather'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { api } from '../src/lib/api'

export default function NewMemory() {
    const { bottom, top } = useSafeAreaInsets()
    const router = useRouter()

    const [preview, setPreview] = useState<string | null>(null)
    const [content, setContent] = useState('')
    const [isPublic, setIsPublic] = useState(false)

    async function openImagePicker() {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });
            
            if(result.assets[0]) {
                setPreview(result.assets[0].uri)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function handleCreateMemory() {
        const token = await SecureStore.getItemAsync('token')

        let coverUrl = ''

        if(preview) {
            const uploadFormData = new FormData()

            uploadFormData.append('file', {
                uri: preview,
                name: 'image.jpg',
                type: 'image/jpeg',
            } as any)

            const uploadResponse = await api.post('/upload', uploadFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            coverUrl = uploadResponse.data.fileUrl
        }

        await api.post('/memories', {
            content,
            isPublic,
            coverUrl,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        router.push('/memories')
    }

    return (
        <ScrollView
            className="flex-1 px-8"
            contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
        >
            <View className="flex-row items-center justify-between">
                <NLWLogo />

                <Link href="/memories" asChild>
                    <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
                        <Icon name="arrow-left" size={16} color="#FFF" />
                    </TouchableOpacity>
                </Link>
            </View>

            <View className="mt-6 space-y-6">
                <View className="flex-row items-center gap-2">
                    <Switch
                        value={isPublic}
                        onValueChange={setIsPublic}
                        trackColor={{ false: '#767577', true: '#372560' }}
                        thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
                    />
                    <Text className="font-body text-base text-gray-200">
                        Public memory
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={openImagePicker}
                    className="h-32 justify-center text-center items-center rounded-lg border border-dashed border-gray-500 bg-black/20"
                >
                    {preview ? (
                        <Image source={{ uri: preview }} className="h-full w-full rounded-lg object-cover" />
                    ) : (
                        <View className="flex-row items-center gap-2">
                            <Icon name="image" color="#FFF" />
                            <Text className="font-body text-sm text-gray-200">
                                Add cover photo or video
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

                <TextInput
                    multiline
                    value={content}
                    onChangeText={setContent}
                    textAlignVertical="top"
                    className="p-0 font-body text-lg text-gray-50"
                    placeholder="Feel at liberty to incorporate photographs, videos, and narratives about this cherished experience you wish to eternally reminisce upon."
                    placeholderTextColor="#56565a"
                />

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleCreateMemory}
                    className="items-center self-end rounded-full bg-green-500 px-5 py-3"
                >
                    <Text className="font-alt text-sm uppercase text-black">
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}