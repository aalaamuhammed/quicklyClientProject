import React, { useState, useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TouchableHighlight,
    PermissionsAndroid,
    ImageBackground,
    Modal,
    Dimensions,
    Animated,
    Easing,
    Image,
    Text,
    View,
    Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HeaderComponent } from '../components/core/Header';
import { actions as appActions } from '../modules/app';
import { actions as profileActions } from '../modules/profile';
import FormButton from '../components/material/FormButton';
import InputField from '../components/material/InputField';
import { actions as OthersActions } from '../modules/other';
import DropdownComp from '../components/material/MultiSelect';
import lang from '../localization';
import { Card, DefaultTheme, Avatar, Badge, Appbar, Paragraph } from 'react-native-paper';
import store from '../features/redux/store';
import common from '../assets/common';
import config from '../assets/config.json';
import * as Svg from '../assets/images';
import { RadioButton } from 'react-native-paper';
import { Rating } from 'react-native-rating-element';
import NoDataComp from '../components/material/NoDataComp';
import { useForm, Controller } from 'react-hook-form';
import LoadingComp from '../components/material/LoadingComp';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const genders = [
    {
        key: 'male',
        text: lang.forms_fields.male,
    },
    {
        key: 'femal',
        text: lang.forms_fields.female,
    },
];
const screenWidth = Dimensions.get('window').width;
const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    mainContaier: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: config.colors.maindarkcolor,
        width: '100%',
        height: '100%',
    },
    viewStyle: {
        flex: 1,
        paddingTop: 0,
        // justifyContent: 'center',
    },
    subitemStyle: {
        justifyContent: 'center',
        flexGrow: 1,
        flex: 1,
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 10,
    },
    changeLanguageText: {
        ...common.fontstyles,
        fontSize: 13,
        color: '#fff',
        textAlign: 'right',
    },
    languageStyle: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    checked: {
        height: '100%',
        backgroundColor: config.colors.mainBgColor,
        padding: 5,
        color: '#fff',
        alignItems: 'center',
        width: 55,
        borderRadius: 3,
    },
    unchecked: {
        backgroundColor: '#fff',
        padding: 5,
        width: 55,
        height: '100%',
        alignItems: 'center',
        color: config.colors.maindarkcolor,
        borderRadius: 3,
    },
    fieldContainer: {
        ...common.fields.fieldContainer,
        flex: 0,
        paddingVertical: 10,
        marginVertical: 10,

    },
    seenNotifications: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    titleTextStyle: {
        ...common.fontstyles,
        fontFamily: 'Cairo-Bold',
        fontSize: 12,
        color: config.colors.darkGrayColor

    },
    linkText: {
        ...common.fontstyles,
        fontSize: 13,
        marginHorizontal: 10,
        paddingVertical: 15,
        borderBottomColor: config.colors.lightGrayColor,
        borderBottomWidth: 1,
        flex: 1,
        // fontFamily: common.BoldFontFamily,
        color: config.colors.mainBgColor,
    },
    IconStyle: {
        paddingVertical: 15, color: config.colors.mainBgColor,

    },
    mainView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000000a7',
        alignItems: 'center',
        margin: 0,
        marginTop: 0,
    },
    subView: {
        width: '85%',
        backgroundColor: 'white',
        justifyContent: 'center',
        // borderRadius: 20,
        padding: 5,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,
        margin: 0,
    },
    modalTitleStyles: {
        ...common.fontstyles,
        color: config.colors.mainBgColor,
        ...common.fontstyles,
        textAlign: 'center',
        fontSize: 13,
        marginVertical: 5,
        marginHorizontal: 30,
    },
    modalSubTitleStyles: {
        ...common.fontstyles,
        color: config.colors.darkGrayColor,
        ...common.fontstyles,
        textAlign: 'center',
        fontSize: 13,
        marginVertical: 5,
        marginHorizontal: 30,
    },
    closeModel: {
        backgroundColor: '#FFF',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        position: 'absolute',
        top: -15,
        right: 10,
        borderRadius: 50,
    },

    outerCircle: {
        // position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120,
        borderRadius: 60
    },
    innerCircle: {
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 110,
        height: 110,
        borderRadius: 60
    },
    leftWrap: {
        position: 'absolute',
        top: 0,
        start: 0,
        width: 120,
        height: 120,
    },
    halfCircle: {
        position: 'absolute',
        top: 0,

        borderTopRightRadius: 1,
        borderBottomRightRadius: 0,
        width: 60,
        height: 120,
        borderRadius: 60
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    TextStyles: { fontSize: 13, color: config.colors.mainBgColor, fontFamily: 'Cairo-Regular' },

});
const ProfileScreen = props => {
    let translateY = useRef(new Animated.ValueXY()).current;

    const DropdownRef = useRef(null);
    const DropdownRef1 = useRef(null);
    const [subLoading, SetsubLoading] = useState(false);
    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isValid },
        setValue,
        getValues,
        setError
    } = useForm({
        mode: "onChange"
    });
    const onSubmit = data => {
        setIsSubmit(true)

        props.profileUpdate({ data: data  }).then(respo => {
            setIsSubmit(false)

        })

    };
    const [isSubmit, setIsSubmit] = useState(false);
    const [isInit, setisInit] = useState(false);
    const [mainLoading, setMainLoading] = useState(false);
    const [comments, setComments] = useState(false);
    const [enableEdit, setEnableEdit] = useState(false);
    const [areas, setAreas] = useState([]);
    const [city, setCity] = useState();
    const [area, setArea] = useState([1]);
    const [areaVisible, setAreaVisible] = useState(false);
    const [imageVisible, setImageVisible] = useState(false);
    const [imageRes, setImageRes] = useState(null);
    const [requestImage, setRequestImage] = useState(null);
    const settingAreas = id => {
        var cities = props.OtherReducer.governorates.find(s => s.id === id);
 
        setAreas(cities.cities);
    };
    let init = async () => {
        Animated.timing(translateY.y, {
            useNativeDriver: true,
            toValue: 1,
            duration: 350,
            easing: Easing.linear,
            delay: 350,
        }).start();
    };
    useEffect(() => {
        translateY.setValue({ x: 0, y: height });
        props.ProfileReducer.UserReviews.length > 0 && init();
    }, [props.ProfileReducer.UserReviews]);

    useEffect(() => { 
        if( props.appReducer.backendErrors.fname)
        setError("fname", {
          type: "manual",
          message: props.appReducer.backendErrors.fname[0],
        })
        if( props.appReducer.backendErrors.lname)
        setError("lname", {
          type: "manual",
          message: props.appReducer.backendErrors.lname[0],
        })
        if( props.appReducer.backendErrors.phone)
        setError("phone", {
          type: "manual",
          message: props.appReducer.backendErrors.phone[0],
        })
        if( props.appReducer.backendErrors.email)
        setError("email", {
          type: "manual",
          message: props.appReducer.backendErrors.email[0],
        })
        if( props.appReducer.backendErrors.password)
        setError("password", {
          type: "manual",
          message: props.appReducer.backendErrors.password[0],
        })
        if( props.appReducer.backendErrors.governorate_id)
        setError("governorate_id", {
          type: "manual",
          message: props.appReducer.backendErrors.governorate_id[0],
        })
        if( props.appReducer.backendErrors.city_id)
        setError("city_id", {
          type: "manual",
          message: props.appReducer.backendErrors.city_id[0],
        })
        if( props.appReducer.backendErrors.gender)
        setError("gender", {
          type: "manual",
          message: props.appReducer.backendErrors.gender[0],
        })
        if( props.appReducer.backendErrors.news_service)
        setError("news_service", {
          type: "manual",
          message:props.appReducer.backendErrors.news_service[0],
        })
      }, [props.appReducer.backendErrors]);
    const renderItem = ({ item }) => (
        <View style={{ margin: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ height: 40, width: 40, borderRadius: 50, borderWidth: 1, borderColor: config.colors.mainBgColor }} source={require('../assets/logo.png')} />
                <View style={{ paddingHorizontal: 10 }}>

                    <Text style={{
                        ...styles.titleTextStyle,
                        fontSize: 12,
                        color: config.colors.mainBgColor
                    }}>
                        {item.author}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Rating
                            rated={parseFloat(item.rate)}
                            totalCount={5}
                            ratingColor={config.colors.mainBgColor}
                            ratingBackgroundColor="#d4d4d4"
                            size={16}
                            readonly // by default is false
                            icon="ios-star"
                            direction="row"
                        />
                        {/* <Text style={{
                            ...styles.titleTextStyle,
                            fontSize: 15,
                            color: config.colors.mainBgColor
                        }}>
                            +4
                             </Text> */}

                    </View>
                </View>
            </View>
            <View style={styles.fieldContainer}>
                <Text style={{
                    ...styles.titleTextStyle,
                    fontSize: 12,
                    marginHorizontal: 10,
                    color: '#000',
                    maxWidth: '80%'
                }}>
                    {item.comment}
                </Text>
                <Text style={{
                    ...styles.titleTextStyle,
                    fontSize: 12,
                    marginHorizontal: 5,
                    position: 'absolute',
                    bottom: 5,
                    end: 0
                }}>
                    {item.created_at}
                </Text>
            </View>
        </View>
    );
    useEffect(() => {
        
        setValue('fname', props.ProfileReducer.userInformation.fname);
        setValue('lname', props.ProfileReducer.userInformation.lname);
        setValue('gender', props.ProfileReducer.userInformation.gender);
        setValue('email', props.ProfileReducer.userInformation.email);
        setValue('phone', props.ProfileReducer.userInformation.phone);
        // if(props.OtherReducer.governorates.length){
        setValue('governorate_id', props.ProfileReducer.userInformation.governorate_id);
        setValue('city_id', props.ProfileReducer.userInformation.city_id);
       
        if (props.ProfileReducer.userInformation.city)
            setCity([props.ProfileReducer.userInformation.governorate.id]);
        if (props.ProfileReducer.userInformation.city) {
            var city = {
                "name": props.ProfileReducer.userInformation.city.name,
                "name_en": props.ProfileReducer.userInformation.city.name_en,
                "id": props.ProfileReducer.userInformation.city.id
            }
            setArea([city.id]);
        }

    }, [props.ProfileReducer.userInformation]);
    useEffect(() => {
          setisInit(true)
        props.ProfileInfo().then(respo => {
            // props.AllReviews().then(respo => {
                setisInit(false);
                props.LoadGovernorates().then(res => {

                    settingAreas(props.ProfileReducer.userInformation.governorate_id)
 
        
                });
        })
 
    }, []); 
    const checkCam = async () => {
        if (Platform.OS !== 'android') {
            Geolocation.requestAuthorization();
        } else {


            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Cool Photo App Camera Permission",
                        message:
                            "Cool Photo App needs access to your camera " +
                            "so you can take awesome pictures.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // console.log("You can use the camera");
                } else {
                    // console.log("Camera permission denied");
                }
            } catch (err) {
                console.warn(err);
            }
        }
    }
    useEffect(() => {
        if (props.appReducer.loading==true) {
            if (isInit) {
                SetsubLoading(false);
                setMainLoading(true)
            }else  if (isSubmit) {
                SetsubLoading(true);
                setMainLoading(false)
            } else  {
                SetsubLoading(false)
                setMainLoading(false)
            }
        
        } 
        else {
            SetsubLoading(false)
            setMainLoading(false)
        }
    }, [props.appReducer.loading])

    useEffect(() => { checkCam() }, [])
    const lunchLibrary = () => { 
        launchImageLibrary(
            {
                title: lang.profile.uploadImage,
                mediaType: 'photo',
                allowsEditing: true,
                cameraType: 'back',

                cancelButtonTitle: lang.btns.Cancel,
                takePhotoButtonTitle: lang.profile.takeImage,
                chooseFromLibraryButtonTitle: lang.profile.choose_from_library,
            },

            response => {
                if (!response.error && !response.didCancel) {
                    setRequestImage(response.assets[0].uri);
                    setImageRes(response.assets[0]);
                    setValue('image',response.assets[0],{ shouldValidate: true , shouldDirty: true}) 
                } else { 
                }
            },
        );
        //  }
    };
    const lunchCam = () => { 



        launchCamera(
            {
                title: lang.profile.uploadImage,
                mediaType: 'photo',
                allowsEditing: true,
                cameraType: 'back',

                cancelButtonTitle: lang.btns.Cancel,
                takePhotoButtonTitle: lang.profile.takeImage,
                chooseFromLibraryButtonTitle: lang.profile.choose_from_library,
            },

            response => {
                if (!response.error && !response.didCancel) { 
                    setRequestImage(response.assets[0].uri); 
                    setImageRes(response.assets[0]);
                    setValue('image',response.assets[0],{ shouldValidate: true , shouldDirty: true}) 
                } else {
                }
            },
        );
        //  }
    };
    if(props.ProfileReducer.userInformation.fname!=null){
    return (
        <View nestedScrollEnabled={true} style={styles.mainContaier}>

            {props.ProfileReducer.userInformation.fname!=null && (
                <View nestedScrollEnabled={true} style={styles.mainContaier}>
                    <View
                        style={{
                            ...styles.viewStyle,
                            backgroundColor: config.colors.maindarkcolor,
                        }}>
                        <ImageBackground
                            style={{
                                justifyContent: 'space-between',
                                // padding: 10,
                                paddingBottom: 5,
                                //    minHeight: 300,
                                backgroundColor: config.colors.maindarkcolor + 'aa',
                            }}
                        >
                            <HeaderComponent
                                fontColor={'#fff'}
                                headerbtn2={() => props.navigation.goBack()}
                                toggleDrawer={() => props.navigation.toggleDrawer()}>
                                {lang.profile.title}
                            </HeaderComponent>
                            <Modal animationType="slide" transparent={true} visible={areaVisible}>
                                <View style={styles.mainView}>
                                    <View style={styles.subView}>
                                        <View style={styles.closeModel}>
                                            <Appbar.Action
                                                icon={'close'}
                                                size={18}
                                                style={{ margin: 5 }}
                                                color={config.colors.mainBgColor}
                                                onPress={() => setAreaVisible(false)}
                                            />
                                        </View>
                                        <Text style={styles.modalTitleStyles}>
                                            {lang.addresses.chooseGov}
                                        </Text>
                                        {/* <Text style={styles.modalSubTitleStyles}>
              {lang.drawer.confirmLogout}
            </Text> */}
                                        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                                            <FormButton
                                                textStyles={{ color: '#fff', fontSize: 12 }}
                                                styleprops={{
                                                    borderColor: 'transparent',
                                                    backgroundColor: config.colors.mainBgColor,
                                                }}
                                                onPress={() => {
                                                    setAreaVisible(false);
                                                }}>
                                                {lang.btns.Ok}
                                            </FormButton>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <Modal animationType="slide" transparent={true} visible={imageVisible}>
                                <View style={styles.mainView}>
                                    <View style={styles.subView}>
                                        <View style={styles.closeModel}>
                                            <Appbar.Action
                                                icon={'close'}
                                                size={18}
                                                style={{ margin: 5 }}
                                                color={config.colors.mainBgColor}
                                                onPress={() => setImageVisible(false)}
                                            />
                                        </View>
                                        <Text style={styles.modalTitleStyles}>
                                            {lang.itemReport.pickImageTitle}
                                        </Text>
                                        {/* <Text style={styles.modalSubTitleStyles}>
              {lang.drawer.confirmLogout}
            </Text> */}
                                        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                                            <FormButton
                                                textStyles={{ color: '#fff', fontSize: 12 }}
                                                styleprops={{
                                                    borderColor: 'transparent',
                                                    backgroundColor: config.colors.mainBgColor,
                                                }}
                                                onPress={() => {
                                                    setImageVisible(false);
                                                    lunchCam()
                                                }}>
                                                {lang.itemReport.lunchCamera}
                                            </FormButton>
                                            <FormButton
                                                textStyles={{ fontSize: 12 }}
                                                onPress={() => {
                                                    setImageVisible(false);
                                                    lunchLibrary()
                                                }}>
                                                {lang.itemReport.lunchStudio}
                                            </FormButton>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                                    <TouchableOpacity style={{ width: 100 }} onPress={() => setComments(false)}>
                                        <Text style={{
                                            ...styles.titleTextStyle,
                                            fontSize: 16,
                                            textAlign: 'center',
                                            color: !comments ? config.colors.mainBgColor : '#fff',
                                            marginVertical: 10
                                        }}>
                                            {lang.profile.account}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={[styles.outerCircle, { backgroundColor: 'transparent' }]}>
                                        <View style={styles.leftWrap}>
                                            <View
                                                style={[
                                                    styles.halfCircle,
                                                    {

                                                        start: 60,
                                                        backgroundColor: comments ? config.colors.mainBgColor : 'transparent',
                                                        transform: [
                                                            // { translateX: 0   },
                                                            { rotate: '180deg' },
                                                            // { translateX: -21 / 2 },
                                                        ],
                                                    },
                                                ]}
                                            />
                                        </View>
                                        <View style={styles.leftWrap}>
                                            <View
                                                style={[
                                                    styles.halfCircle,
                                                    {
                                                        start: 0,
                                                        backgroundColor: !comments ? config.colors.mainBgColor : 'transparent',
                                                        transform: [
                                                            // { translateX: 22 / 2 },
                                                            { rotate: '0deg' },
                                                            //{ translateX: -21 / 2 },
                                                        ],
                                                    },
                                                ]}
                                            />
                                        </View>


                                        <TouchableHighlight style={styles.innerCircle} onPress={() => { if (enableEdit) { setImageVisible(true) } }}>
                                            <View>
                                                <Avatar.Image size={110} source={
                                                    requestImage
                                                        ? { uri: requestImage }
                                                        : { uri: props.ProfileReducer.userInformation.profile_pic }} style={{ resizeMode: 'contain', backgroundColor: '#fff', }} />
                                                {enableEdit && <View style={{ position: 'absolute', backgroundColor: config.colors.maindarkcolor + 'cc', height: 40, width: 110, bottom: 0, borderRadius: 60, borderTopRightRadius: 0, borderTopLeftRadius: 0, justifyContent: 'center', alignItems: 'center' }}>
                                                    <MaterialCommunityIcons onPress={() => { if (enableEdit) { setImageVisible(true) } }} style={{ fontSize: 25 }} name={'camera-outline'} color={'#fff'} />
                                                </View>}
                                            </View>
                                        </TouchableHighlight>
                                    </View>

                                    <TouchableOpacity style={{ width: 100 }} onPress={() => setComments(true)}>
                                        <Text style={{
                                            ...styles.titleTextStyle,
                                            fontSize: 16,
                                            textAlign: 'center',
                                            color: comments ? config.colors.mainBgColor : '#fff',
                                            marginVertical: 10
                                        }}>
                                            {lang.profile.comments + ' ' + props.ProfileReducer.userInformation.reviews_count}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                    {/* <Avatar.Image size={110} source={require('../assets/Shutterstock-1431420185-940054.png')} style={{ resizeMode: 'contain', backgroundColor: '#fff',borderWidth:3,borderColor:'blue' }} /> */}
                                    {/* <Image style={{ 
                                 width: 120,
                                 height: 120,
                                  borderRadius: 60,
                                     borderWidth: 1,
                                   borderStartWidth:5,
                                   borderBottomWidth:1,
                                   borderBottomColor:'blue',
                                    borderTopColor: config.colors.mainBgColor }} source={require('../assets/logo.png')} /> */}
                                </View>


                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{
                                        ...styles.titleTextStyle,
                                        fontSize: 16,
                                        color: '#fff',
                                        marginVertical: 10
                                    }}>
                                        {props.ProfileReducer.userInformation.fname + ' ' + props.ProfileReducer.userInformation.lname}
                                    </Text>
                                    <MaterialCommunityIcons onPress={() => { setEnableEdit(!enableEdit) }} style={{ fontSize: 25 }} name={'pencil'} color={enableEdit ? config.colors.mainBgColor : '#fff'} />


                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Rating
                                        rated={parseFloat(props.ProfileReducer.userInformation.total_rate)}
                                        totalCount={5}
                                        ratingColor={config.colors.mainBgColor}
                                        ratingBackgroundColor="#d4d4d4"
                                        size={16}
                                        readonly // by default is false
                                        icon="ios-star"
                                        direction="row"
                                    />
                                    <TouchableOpacity onPress={() => setComments(true)}>
                                        <Text style={{
                                            ...styles.titleTextStyle,
                                            fontSize: 15,
                                            color: config.colors.mainBgColor
                                        }}>
                                            {(props.ProfileReducer.userInformation.rating % 1) > 0.0 ? '+' : ''}
                                            {props.ProfileReducer.userInformation.rating}
                                        </Text>
                                    </TouchableOpacity>
                                </View>



                            </View>

                        </ImageBackground>
                    </View>

                    <View style={{ ...styles.subitemStyle, }}>
                        <View style={{ paddingHorizontal: 10 }}>
                            {comments &&

                                <View style={{ padding: 10, }}>
                                    {props.ProfileReducer.UserReviews.length > 0 && (
                                        <Animated.FlatList
                                            data={props.ProfileReducer.UserReviews}
                                            renderItem={renderItem}
                                            // fadeDuration={0}
                                            keyExtractor={item => item.id}
                                            style={[{ transform: [{ translateY: translateY.y }] }]}
                                        />
                                    )}
                                    {props.ProfileReducer.UserReviews.length < 1 && (
                                        <NoDataComp
                                            NoDataText={lang.profile.nodata}
                                        />
                                    )}
                                </View>

                            }
                            {!comments && <ScrollView keyboardShouldPersistTaps="always">
                                <View style={{ marginVertical: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ ...styles.TextStyles, width: 90, }}>{lang.forms_fields.firstName} </Text>
                                        <View style={{ flex: 1 }}>

                                            <Controller
                                                defaultValue=""
                                                name="fname"
                                                control={control}
                                                rules={{
                                                    required: { value: true, message: lang.Validation.required },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <InputField
                                                        containerStyles={{
                                                            paddingHorizontal: 0,
                                                            marginHorizontal: 0,
                                                        }}
                                                        editable={enableEdit}
                                                        placeholder={lang.forms_fields.firstName}
                                                        onBlur={onBlur}
                                                        maxLength={25}
                                                        onChangeText={value => onChange(value)}
                                                        value={value}
                                                        error={errors.fname?.message}
                                                    />
                                                )}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ ...styles.TextStyles, width: 90, }}>{lang.signup.familyName} </Text>
                                        <View style={{ flex: 1 }}>
                                            <Controller
                                                defaultValue=""
                                                name="lname"
                                                control={control}
                                                rules={{
                                                    required: { value: true, message: lang.Validation.required },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <InputField
                                                        containerStyles={{
                                                            paddingHorizontal: 0,
                                                            marginHorizontal: 0,
                                                        }}
                                                        editable={enableEdit}
                                                        value={value}
                                                        placeholder={lang.signup.familyName}
                                                        maxLength={25}
                                                        onChangeText={value => onChange(value)}
                                                        error={errors.lname?.message}
                                                    />
                                                )}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <ScrollView scrollEnabled={false} showsHorizontalScrollIndicator={false} horizontal={true} style={{
                                            display: "flex", width: screenWidth

                                        }}>

                                            <View style={{ flex: 1, width: screenWidth, flexDirection: 'row', }}>

                                                <Text style={{ ...styles.TextStyles, marginTop: 15, width: 70 }}>{lang.signup.city} </Text>
                                                <Controller
                                                    defaultValue=""
                                                    name="governorate_id"
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: lang.Validation.required },
                                                    }}
                                                    render={({ field: { onChange, onBlur, value } }) => (

                                                        <DropdownComp
                                                            items={props.OtherReducer.governorates}
                                                            error={errors.governorate_id?.message}
                                                            DropdownRef1={DropdownRef1}
                                                            onToggleList={() => {
                                                                if (!enableEdit) { DropdownRef1.current._clearSelectorCallback() }

                                                            }}
                                                            onSelectedItemsChange={
                                                                value => {
                                                                    onChange(value[0]);
                                                                    setValue('city_id', '');
                                                                    setCity(value);
                                                                    setArea();
                                                                    settingAreas(value[0]);
                                                                }}
                                                            label={lang.signup.city}
                                                            uniqueKey='id'
                                                            single={true}
                                                            selectedItems={city}
                                                            selectText={city}
                                                            searchInputPlaceholderText={lang.forms_fields.chooseValue}
                                                            displayKey={lang.lang === 'ar' ? "name" : "name_en"} />
                                                    )}
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <ScrollView scrollEnabled={false} showsHorizontalScrollIndicator={false} horizontal={true} style={{
                                            display: "flex", width: screenWidth

                                        }}>
                                            <View style={{ flex: 1, width: screenWidth, flexDirection: 'row', }}>
                                                <Text style={{ ...styles.TextStyles, marginTop: 15, width: 70 }}>
                                                    {lang.signup.area} </Text>
                                                {/* <View style={{flex: 1}}> */}
                                                <Controller
                                                    defaultValue=""
                                                    name="city_id"
                                                    control={control}
                                                    rules={{
                                                        required: { value: true, message: lang.Validation.required },
                                                    }}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <DropdownComp
                                                            items={areas}
                                                            error={errors.city_id?.message}
                                                            DropdownRef1={DropdownRef}
                                                            onToggleList={() => {
                                                                if (enableEdit) {
                                                                    if (getValues('governorate_id') !== "") { setAreaVisible(false); }
                                                                    else {
                                                                        setAreaVisible(true)
                                                                        DropdownRef.current._clearSelectorCallback()
                                                                    }
                                                                } else {
                                                                    DropdownRef.current._clearSelectorCallback()
                                                                }
                                                            }}
                                                            onSelectedItemsChange={
                                                                value => {
                                                                    onChange(value[0]);
                                                                    setArea(value);

                                                                }}
                                                            label={lang.signup.area}
                                                            uniqueKey='id'
                                                            single={true}
                                                            selectedItems={area}
                                                            selectText={props.ProfileReducer.userInformation.city && (lang.lang === 'ar' ? props.ProfileReducer.userInformation.city.name : props.ProfileReducer.userInformation.city.name_en)}
                                                            searchInputPlaceholderText={lang.forms_fields.chooseValue}
                                                            displayKey={lang.lang === 'ar' ? "name" : "name_en"} />
                                                    )}
                                                />
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ ...styles.TextStyles, width: 90, }}>{lang.addresses.phoneNo} </Text>
                                        <View style={{ flex: 1 }}>
                                            <Controller
                                                defaultValue=""
                                                name="phone"
                                                control={control}
                                                rules={{
                                                    required: { value: true, message: lang.Validation.required },
                                                    validate: value => !isNaN(value) || lang.Validation.NoReq,
                                                    minLength: { value: 11, message: lang.Validation.minPhoneNo },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <InputField
                                                        containerStyles={{
                                                            paddingHorizontal: 0,
                                                            marginHorizontal: 0,
                                                        }}
                                                        editable={false}

                                                        keyboardType="phone-pad"
                                                        maxLength={11}
                                                        placeholder={lang.addresses.phoneNo}
                                                        secureTextEntry={false}
                                                        onChangeText={value => onChange(value)}
                                                        value={value}
                                                        postText={'+2'}
                                                        error={errors.phone?.message}
                                                    />
                                                )}
                                            />
                                            <Text style={{ ...styles.TextStyles, fontSize: 11 }}>{lang.Validation.changePhone} </Text>

                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ ...styles.TextStyles, width: 90, }}>{lang.forms_fields.email} </Text>
                                        <View style={{ flex: 1 }}>
                                            <Controller
                                                defaultValue=""
                                                name="email"
                                                control={control}
                                                rules={{
                                                    required: { value: true, message: lang.Validation.required },
                                                    pattern: {
                                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                        message: lang.Validation.email,
                                                    },
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <InputField
                                                        containerStyles={{
                                                            paddingHorizontal: 0,
                                                            marginHorizontal: 0,
                                                        }}
                                                        editable={enableEdit}

                                                        placeholder={lang.forms_fields.email}
                                                        secureTextEntry={false}
                                                        onChangeText={value => onChange(value)}
                                                        value={value}
                                                        error={errors.email?.message}
                                                    />
                                                )}
                                            />
                                        </View>
                                    </View>
                                    <View style={{
                                        ...common.radio.radioContainer, flexDirection: 'row',
                                        marginHorizontal: 0,
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{ ...styles.TextStyles, marginTop: 15, width: 70 }}>{lang.signup.gender} </Text>
                                        {genders.map(item => {
                                            return (
                                                <View key={item.key} style={styles.buttonContainer}>
                                                    <Controller
                                                        defaultValue=""
                                                        name="gender"
                                                        control={control}
                                                        render={({ field: { onChange, onBlur, value } }) => (
                                                            <RadioButton
                                                                disabled={!enableEdit}

                                                                value={value}
                                                                color={config.colors.mainBgColor}
                                                                uncheckedColor={config.colors.mainBgColor}
                                                                status={value === item.key ? 'checked' : 'unchecked'}
                                                                onPress={() => {
                                                                    setValue('gender', item.key);
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    <Text
                                                        style={{
                                                            ...styles.TextStyles,
                                                        }}>
                                                        {item.text}
                                                    </Text>
                                                </View>
                                            );
                                        })}
                                    </View>
                                    {enableEdit && <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <FormButton
                                            textStyles={{ color: '#fff' }}
                                            styleprops={{
                                                borderColor: 'transparent',
                                                backgroundColor: (!isDirty || !isValid)
                                                    ? config.colors.darkGrayColor
                                                    : config.colors.mainBgColor,
                                                maxWidth: '70%',
                                            }}

                                            disabled={!isDirty || !isValid}
                                            loadingprop={!mainLoading && subLoading}
                                            onPress={handleSubmit(onSubmit)}>
                                            {lang.addresses.save}
                                        </FormButton>
                                    </View>}
                                </View>
                            </ScrollView>
                            }
                        </View>
                    </View>

                </View>
                )}  
            {!subLoading && mainLoading && (
                // <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <LoadingComp
                        showHeader={true}
                        navigation={props.navigation}
                        pageTitle={lang.home.title}
                    />
                // </View>
            )}
        </View>
    );}
    else{
    return  (  <View nestedScrollEnabled={true} style={{...styles.mainContaier, backgroundColor: '#fff',}}>

    
        {!subLoading && mainLoading && (
            // <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <LoadingComp
                    showHeader={true}
                    navigation={props.navigation}
                    pageTitle={lang.home.title}
                />
            // </View>
        )}
    </View>)
    }
};
const mapDispatchToProps = (dispatch, getState = store.getState) => ({
    LoadGovernorates: () => OthersActions.LoadGovernorates()(dispatch, getState),
    ProfileInfo: () => profileActions.ProfileInfo()(dispatch),
    profileUpdate: data => profileActions.profileUpdate(data)(dispatch),
    AllReviews: () => profileActions.AllReviews()(dispatch),
});

const mapStateToProps = state => ({
    OtherReducer: state.OtherReducer,
    appReducer: state.appReducer,
    appReducer: state.appReducer,
    ProfileReducer: state.ProfileReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
