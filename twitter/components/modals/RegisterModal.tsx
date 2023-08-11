import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from 'react';
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import {signIn} from "next-auth/react";

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();
    }, [isLoading, registerModal, loginModal]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.post('/api/register', {
                email,
                password,
                username,
                name
            });

            toast.success('Hesap Oluşturuldu.');

            signIn('credentials', {
                email,
                password
            });
            
            registerModal.onClose();

        } catch (error) {
            console.log(error);
            toast.error('Bir şeyler ters gitti');
        } finally {
           setIsLoading(false);
        }
    }, [registerModal, email, password, username, name]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input 
                placeholder="İsim"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input 
                placeholder="Kullanıcı Adı"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input 
                placeholder="Şifre"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />

        </div>

    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Zaten Hesabım Var. 
                <span
                    onClick={onToggle}
                    className="
                        text-white
                        cursor-pointer
                        hover:underline
                    "
                >
                    Giriş Yap
                </span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Hesap Oluştur"
            actionLabel="Kayıt Ol"
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default RegisterModal;