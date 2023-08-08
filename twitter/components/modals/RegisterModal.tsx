import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from 'react';
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";

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

            // register and login
            
            registerModal.onClose();

        } catch (error) {
            console.log(error); 
        } finally {
           setIsLoading(false);
        }
    }, [loginModal]);

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
                value={password}
                disabled={isLoading}
            />
            <Input 
                placeholder="Kullanıcı Adı"
                onChange={(e) => setUsername(e.target.value)}
                value={password}
                disabled={isLoading}
            />
            <Input 
                placeholder="Şifre"
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